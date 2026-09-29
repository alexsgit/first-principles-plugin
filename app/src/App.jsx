import { useMemo, useState } from "react";
import LearningScene from "./components/LearningScene.jsx";
import { categories, topics } from "./data/topics.js";
import { useWikipediaSearch, useWikipediaSummary } from "./hooks/useWikipedia.js";

function WikipediaPanel({ title, onClear }) {
  const { status, summary, error } = useWikipediaSummary(title);

  if (!title) return null;
  return (
    <section className="wiki-panel" aria-live="polite">
      <div className="section-kicker">WIKIPEDIA · SOURCED BACKGROUND</div>
      <button className="text-button wiki-close" type="button" onClick={onClear} aria-label="Close Wikipedia summary">Close</button>
      {status === "loading" && <p className="muted">Loading article summary…</p>}
      {status === "error" && <p className="error-message" role="alert">{error}</p>}
      {summary && (
        <>
          <h3>{summary.title}</h3>
          <p>{summary.extract}</p>
          <a className="source-link" href={summary.content_urls?.desktop?.page} target="_blank" rel="noreferrer">
            Read “{summary.title}” on Wikipedia <span aria-hidden="true">↗</span>
          </a>
          <p className="attribution">Article summary from Wikipedia, available under CC BY-SA. The interactive model and teaching interpretation are curated separately.</p>
        </>
      )}
    </section>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedPart, setSelectedPart] = useState(topics[0].steps[0].focus);
  const [wikiTitle, setWikiTitle] = useState("");
  const activeTopic = topics.find((topic) => topic.id === activeTopicId) ?? topics[0];
  const activeStep = activeTopic.steps[stepIndex];
  const wikiSearch = useWikipediaSearch(query);

  const visibleTopics = useMemo(() => {
    const search = query.trim().toLowerCase();
    return topics.filter((topic) => {
      const inCategory = category === "All" || topic.category === category;
      const matches = !search || `${topic.title} ${topic.subtitle} ${topic.category}`.toLowerCase().includes(search);
      return inCategory && matches;
    });
  }, [category, query]);

  function selectTopic(topic) {
    setActiveTopicId(topic.id);
    setStepIndex(0);
    setSelectedPart(topic.steps[0].focus);
    setWikiTitle("");
  }

  function changeStep(nextIndex) {
    const boundedIndex = Math.max(0, Math.min(activeTopic.steps.length - 1, nextIndex));
    setStepIndex(boundedIndex);
    setSelectedPart(activeTopic.steps[boundedIndex].focus);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="First Principles home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span>first principles<span className="brand-period">.</span></span>
        </a>
        <div className="topbar-note"><span className="status-pip" /> A little more curious, every day</div>
        <a className="topbar-link" href="https://en.wikipedia.org/wiki/Main_Page" target="_blank" rel="noreferrer">Sources & attribution ↗</a>
      </header>

      <main className="layout">
        <aside className="sidebar">
          <div className="sidebar-heading">
            <div>
              <span className="section-kicker">THE EXPLORER</span>
              <h1>What are you<br />curious about?</h1>
            </div>
            <span className="topic-count">{topics.length}<small> TOPICS</small></span>
          </div>
          <label className="search-wrap">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="visually-hidden">Search learning topics or Wikipedia</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search anything…" />
            {query && <button type="button" aria-label="Clear search" className="clear-search" onClick={() => setQuery("")}>×</button>}
          </label>

          <div className="category-list" aria-label="Filter by subject">
            {categories.map((item) => (
              <button key={item} type="button" className={`category-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>

          <div className="topic-list-heading"><span>START EXPLORING</span><span>{visibleTopics.length} results</span></div>
          <div className="topic-list">
            {visibleTopics.map((topic, index) => (
              <button
                type="button"
                key={topic.id}
                className={`topic-card ${activeTopic.id === topic.id ? "selected" : ""}`}
                onClick={() => selectTopic(topic)}
                style={{ "--topic-accent": topic.accent }}
                aria-pressed={activeTopic.id === topic.id}
              >
                <span className="topic-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="topic-card-copy"><strong>{topic.title}</strong><small>{topic.category}</small></span>
                <span className="topic-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
            {visibleTopics.length === 0 && <p className="empty-state">No curated topics match yet. Try a Wikipedia search below.</p>}
          </div>

          <div className="wiki-discovery">
            <div className="topic-list-heading"><span>DISCOVER ON WIKIPEDIA</span><span>↗</span></div>
            {query.trim().length < 2 && <p className="discovery-hint">Search across the encyclopedia to discover more topics.</p>}
            {wikiSearch.status === "loading" && <p className="discovery-hint">Searching Wikipedia…</p>}
            {wikiSearch.status === "error" && <p className="error-message" role="alert">{wikiSearch.error}</p>}
            {wikiSearch.status === "ready" && wikiSearch.results.length === 0 && <p className="discovery-hint">No Wikipedia pages found for “{query}”.</p>}
            {wikiSearch.results.map((result) => (
              <button className="wiki-result" key={result.url || result.title} onClick={() => setWikiTitle(result.title)} type="button">
                <span><strong>{result.title}</strong>{result.description && <small>{result.description}</small>}</span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
            <div className="discovery-footnote">Wikipedia helps find topics and sources. Its articles do not generate the 3D models.</div>
          </div>
        </aside>

        <section className="learning-area" aria-label="Interactive learning canvas">
          <div className="learning-heading">
            <div>
              <div className="breadcrumb"><span>EXPLORE</span><span>/</span><span>{activeTopic.category.toUpperCase()}</span></div>
              <h2>{activeTopic.title}</h2>
              <p>{activeTopic.subtitle}</p>
            </div>
            <button className="source-pill" type="button" onClick={() => setWikiTitle(activeTopic.wikipediaTitle)}>
              <span className="source-dot" /> WIKIPEDIA SOURCE <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="workspace">
            <div className="visual-column">
              <LearningScene topic={activeTopic} selectedPart={selectedPart} onSelectPart={setSelectedPart} />
              <div className="part-strip">
                <div className="part-strip-label"><span className="section-kicker">IN THIS MODEL</span><small>Select a part to inspect it</small></div>
                <div className="part-buttons">
                  {activeTopic.nodes.map((node) => (
                    <button
                      type="button"
                      key={node.id}
                      className={`part-chip ${selectedPart === node.id ? "active" : ""}`}
                      onClick={() => setSelectedPart(node.id)}
                      aria-pressed={selectedPart === node.id}
                    >
                      <span style={{ "--part-color": node.color }} />{node.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="model-note"><span aria-hidden="true">✳</span> This is a curated conceptual visualization—not a model generated from Wikipedia. Scale, shape, and detail are simplified for learning.</div>
            </div>

            <aside className="lesson-panel">
              <div className="lesson-topline"><span className="section-kicker">FIRST PRINCIPLES</span><span>{String(stepIndex + 1).padStart(2, "0")} <i>/</i> {String(activeTopic.steps.length).padStart(2, "0")}</span></div>
              <div className="step-track" aria-label={`Step ${stepIndex + 1} of ${activeTopic.steps.length}`}>
                {activeTopic.steps.map((step, index) => <span key={step.title} className={index <= stepIndex ? "filled" : ""} />)}
              </div>
              <div className="lesson-content" aria-live="polite">
                <div className="step-eyebrow">STEP {String(stepIndex + 1).padStart(2, "0")}</div>
                <h3>{activeStep.title}</h3>
                <p>{activeStep.text}</p>
                <div className="focus-card">
                  <div className="focus-icon" aria-hidden="true">◎</div>
                  <div>
                    <span className="section-kicker">LOOK CLOSER</span>
                    <strong>{activeTopic.nodes.find((node) => node.id === selectedPart)?.label ?? "Model component"}</strong>
                    <p>{activeTopic.nodes.find((node) => node.id === selectedPart)?.detail}</p>
                  </div>
                </div>
                <div className="learning-prompt"><span>ASK YOURSELF</span><p>What has to be true for this to work?</p></div>
              </div>
              <div className="lesson-controls">
                <button className="prev-button" type="button" onClick={() => changeStep(stepIndex - 1)} disabled={stepIndex === 0}>← <span>Previous</span></button>
                <button className="next-button" type="button" onClick={() => changeStep(stepIndex + 1)} disabled={stepIndex === activeTopic.steps.length - 1}>
                  <span>{stepIndex === activeTopic.steps.length - 1 ? "You've got it" : "Next idea"}</span>{stepIndex < activeTopic.steps.length - 1 && "→"}
                </button>
              </div>
            </aside>
          </div>

          <WikipediaPanel title={wikiTitle} onClear={() => setWikiTitle("")} />

          <footer className="page-footer">
            <span>Built for the joy of understanding.</span>
            <span>Curated explanations · Transparent sources · Always a model</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
