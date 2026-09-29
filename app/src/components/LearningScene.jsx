import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function makeGeometry(node) {
  const radius = node.size ?? 0.3;
  switch (node.kind) {
    case "box":
      return new THREE.BoxGeometry(radius * 1.3, radius * 0.75, radius * 0.45);
    case "cylinder":
      return new THREE.CylinderGeometry(radius * 0.45, radius * 0.45, radius * 2.1, 24);
    case "ring":
      return new THREE.TorusGeometry(radius, Math.max(0.025, radius * 0.045), 10, 96);
    case "triangle":
      return new THREE.ConeGeometry(radius, radius * 1.5, 3);
    case "helix":
      return new THREE.TorusKnotGeometry(radius * 0.65, radius * 0.08, 96, 8, 2, 3);
    case "branch":
      return new THREE.IcosahedronGeometry(radius * 0.72, 1);
    case "links":
    case "truss":
    case "bicycle-wheels":
    case "bicycle-frame":
    case "bicycle-chain":
      return null;
    default:
      return new THREE.SphereGeometry(radius, 32, 24);
  }
}

function addConnection(group, a, b, color, thickness = 0.025, partId) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const direction = new THREE.Vector3().subVectors(end, start);
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(thickness, thickness, direction.length(), 8),
    new THREE.MeshStandardMaterial({ color, roughness: 0.56, metalness: 0.14 }),
  );
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  mesh.userData.partId = partId;
  group.add(mesh);
}

function addPart(parent, node, nodes) {
  const part = new THREE.Group();
  part.userData.partId = node.id;
  const center = node.position ?? [0, 0, 0];

  if (node.kind === "links") {
    const material = new THREE.MeshStandardMaterial({ color: node.color, roughness: 0.48, metalness: 0.18 });
    for (let index = 0; index < 3; index += 1) {
      const x = (index - 1) * node.size * 0.42;
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, node.size * 0.85, 8), material.clone());
      mesh.position.set(center[0] + x, center[1], center[2]);
      mesh.rotation.z = Math.PI / 2;
      mesh.userData.partId = node.id;
      part.add(mesh);
    }
  } else if (node.kind === "bicycle-wheels") {
    [-0.82, 0.82].forEach((x) => {
      const wheel = new THREE.Mesh(
        new THREE.TorusGeometry(node.size, node.size * 0.055, 10, 64),
        new THREE.MeshStandardMaterial({ color: node.color, roughness: 0.52, metalness: 0.16 }),
      );
      wheel.position.set(center[0] + x, center[1] - 0.28, center[2]);
      wheel.userData.partId = node.id;
      part.add(wheel);
    });
  } else if (node.kind === "bicycle-frame") {
    const rear = [-0.82, -0.28, 0];
    const crank = [0, -0.28, 0];
    const seat = [-0.3, 0.38, 0];
    const steering = [0.28, 0.36, 0];
    const front = [0.82, -0.28, 0];
    [[rear, crank], [crank, seat], [seat, rear], [seat, steering], [steering, front], [crank, front]]
      .forEach(([a, b]) => addConnection(part, a, b, node.color, 0.035, node.id));
  } else if (node.kind === "bicycle-chain") {
    const rearTop = [-0.82, -0.16, 0.04];
    const rearBottom = [-0.82, -0.4, 0.04];
    const crankTop = [0, -0.16, 0.04];
    const crankBottom = [0, -0.4, 0.04];
    [[rearTop, crankTop], [crankTop, crankBottom], [crankBottom, rearBottom], [rearBottom, rearTop]]
      .forEach(([a, b]) => addConnection(part, a, b, node.color, 0.014, node.id));
  } else if (node.kind === "truss") {
    const left = [center[0] - node.size, center[1] - 0.06, center[2]];
    const right = [center[0] + node.size, center[1] - 0.06, center[2]];
    const topLeft = [center[0] - node.size * 0.5, center[1] + node.size * 0.55, center[2]];
    const topRight = [center[0] + node.size * 0.5, center[1] + node.size * 0.55, center[2]];
    [[left, topLeft], [topLeft, right], [right, topRight], [topRight, left], [topLeft, topRight], [left, right]]
      .forEach(([a, b]) => addConnection(part, a, b, node.color, 0.035, node.id));
  } else {
    const geometry = makeGeometry(node);
    if (!geometry) return part;
    const material = new THREE.MeshStandardMaterial({ color: node.color, roughness: 0.52, metalness: 0.12 });
    if (node.id === "wall") {
      material.transparent = true;
      material.opacity = 0.18;
      material.wireframe = true;
    }
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...center);
    mesh.userData.partId = node.id;
    if (node.rotation) mesh.rotation.set(...node.rotation);
    else if (node.kind === "cylinder") mesh.rotation.z = Math.PI / 2;
    part.add(mesh);
  }

  if (node.id === "nucleus") {
    nodes.filter((candidate) => candidate.id.startsWith("electron-"))
      .forEach((electron) => addConnection(part, [0, 0, 0], electron.position, "#507b86", 0.008, node.id));
  }
  parent.add(part);
  return part;
}

export default function LearningScene({ topic, selectedPart, onSelectPart }) {
  const mountRef = useRef(null);
  const selectRef = useRef(onSelectPart);
  const selectedRef = useRef(selectedPart);
  const [error, setError] = useState("");
  selectRef.current = onSelectPart;
  selectedRef.current = selectedPart;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let renderer;
    let animationFrame = 0;
    let controls;
    let scene;
    let camera;

    try {
      scene = new THREE.Scene();
      scene.background = new THREE.Color("#202b2d");
      camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(2.8, 2.1, 4.3);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      mount.replaceChildren(renderer.domElement);
      renderer.domElement.setAttribute("aria-label", `Interactive 3D conceptual model: ${topic.title}`);
      renderer.domElement.setAttribute("role", "img");
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.07;
      controls.minDistance = 2.2;
      controls.maxDistance = 7;

      scene.add(new THREE.HemisphereLight("#e6eee0", "#354149", 2.1));
      const keyLight = new THREE.DirectionalLight("#fff3da", 2.6);
      keyLight.position.set(3.5, 4, 5);
      scene.add(keyLight);
      const fillLight = new THREE.PointLight("#70bcb2", 10, 8);
      fillLight.position.set(-3, 1.5, -2);
      scene.add(fillLight);

      const grid = new THREE.GridHelper(7, 14, "#435356", "#344346");
      grid.position.y = -1.05;
      scene.add(grid);
      const group = new THREE.Group();
      const parts = topic.nodes.map((node) => addPart(group, node, topic.nodes));
      scene.add(group);

      const resize = () => {
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        if (!width || !height) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      resize();

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      let pointerDown;
      const handlePointerDown = (event) => { pointerDown = { x: event.clientX, y: event.clientY }; };
      const handlePointerUp = (event) => {
        if (!pointerDown || Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y) > 5) return;
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -((event.clientY - rect.top) / rect.height) * 2 + 1,
        );
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(group.children, true)[0];
        const partId = hit?.object.userData.partId ?? hit?.object.parent?.userData.partId;
        if (partId) selectRef.current(partId);
        pointerDown = null;
      };
      renderer.domElement.addEventListener("pointerdown", handlePointerDown);
      renderer.domElement.addEventListener("pointerup", handlePointerUp);

      const animate = () => {
        animationFrame = requestAnimationFrame(animate);
        controls.update();
        parts.forEach((part) => {
          const active = part.userData.partId === selectedRef.current;
          part.scale.setScalar(active ? 1.08 : 1);
          part.traverse((object) => {
            if (object.material?.emissive) {
              object.material.emissive.set(active ? "#405d4e" : "#000000");
              object.material.emissiveIntensity = active ? 0.35 : 0;
            }
          });
        });
        renderer.render(scene, camera);
      };
      animate();
      setError("");

      return () => {
        cancelAnimationFrame(animationFrame);
        resizeObserver.disconnect();
        renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
        renderer.domElement.removeEventListener("pointerup", handlePointerUp);
        controls.dispose();
        scene.traverse((object) => {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material?.dispose();
        });
        renderer.dispose();
        mount.replaceChildren();
      };
    } catch (initializationError) {
      setError(`3D scene unavailable: ${initializationError.message}`);
      renderer?.dispose();
      return undefined;
    }
  }, [topic]);

  return (
    <div className="scene-frame">
      <div className="scene-hud"><span className="live-dot" /> INTERACTIVE MODEL</div>
      <div className="scene-tip">Drag to rotate <span>·</span> Scroll to zoom</div>
      {error ? <div className="scene-error" role="alert">{error}</div> : <div className="scene-canvas" ref={mountRef} />}
      <div className="scene-disclaimer">Conceptual visualization · Not to scale</div>
    </div>
  );
}
