import { useEffect, useState } from "react";

const API = "https://en.wikipedia.org/w/api.php";

export function useWikipediaSearch(query) {
  const [state, setState] = useState({ status: "idle", results: [], error: "" });

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setState({ status: "idle", results: [], error: "" });
      return undefined;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setState({ status: "loading", results: [], error: "" });
      try {
        const url = new URL(API);
        url.search = new URLSearchParams({
          action: "opensearch",
          search: term,
          limit: "5",
          namespace: "0",
          format: "json",
          origin: "*",
        });
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`Wikipedia search failed (${response.status}).`);
        const data = await response.json();
        setState({
          status: "ready",
          results: (data[1] ?? []).map((title, index) => ({
            title,
            description: data[2]?.[index] ?? "",
            url: data[3]?.[index] ?? "",
          })),
          error: "",
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          setState({ status: "error", results: [], error: error.message || "Wikipedia search could not be reached." });
        }
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return state;
}

export function useWikipediaSummary(title) {
  const [state, setState] = useState({ status: "idle", summary: null, error: "" });

  useEffect(() => {
    if (!title) {
      setState({ status: "idle", summary: null, error: "" });
      return undefined;
    }
    const controller = new AbortController();

    async function loadSummary() {
      setState({ status: "loading", summary: null, error: "" });
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replaceAll(" ", "_"))}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error(`Article summary unavailable (${response.status}).`);
        const summary = await response.json();
        if (!summary.extract) throw new Error("Wikipedia did not provide a summary for this page.");
        setState({ status: "ready", summary, error: "" });
      } catch (error) {
        if (error.name !== "AbortError") {
          setState({ status: "error", summary: null, error: error.message || "The article summary could not be loaded." });
        }
      }
    }

    loadSummary();
    return () => controller.abort();
  }, [title]);

  return state;
}
