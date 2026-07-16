"use client";

import { useMemo, useState } from "react";

type Platform = "TikTok" | "Instagram" | "YouTube" | "X";
type Tone = "Bold" | "Educational" | "Personal" | "Contrarian";

const hooks: Record<Tone, string[]> = {
  Bold: [
    "Stop {doing} if you want {outcome}.",
    "The {audience} playbook nobody gives you for free:",
    "You do not need more {thing}. You need this.",
  ],
  Educational: [
    "The 3-step framework I use to get {outcome}:",
    "Here is the simplest way to improve your {thing} this week.",
    "Save this: a practical guide to {outcome}.",
  ],
  Personal: [
    "I wasted years doing {doing}. Here is what changed.",
    "What I wish I knew before trying to get {outcome}.",
    "A small decision changed how I approach {thing}.",
  ],
  Contrarian: [
    "Unpopular opinion: {doing} is not how you get {outcome}.",
    "Most advice about {thing} is backwards.",
    "You are probably optimizing the wrong part of {thing}.",
  ],
};

const platformTips: Record<Platform, string> = {
  TikTok: "Open with the tension in the first second. Skip the intro.",
  Instagram: "Pair this with a clean cover and a line break after the hook.",
  YouTube: "Turn the promise into a visual proof within the first 15 seconds.",
  X: "Make the first line stand alone. Build the rest as a clean thread.",
};

function field(value: string, fallback: string) {
  return value.trim() || fallback;
}

export default function Home() {
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [tone, setTone] = useState<Tone>("Bold");
  const [audience, setAudience] = useState("creators");
  const [outcome, setOutcome] = useState("better content");
  const [copied, setCopied] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  const results = useMemo(() => {
    const collection = hooks[tone];
    return [0, 1, 2].map((offset) => {
      const template = collection[(offset + refresh) % collection.length];
      return template
        .replace("{audience}", field(audience, "creators"))
        .replaceAll("{outcome}", field(outcome, "better content"))
        .replaceAll("{thing}", field(outcome, "content"))
        .replaceAll("{doing}", "copying what everyone else does");
    });
  }, [audience, outcome, refresh, tone]);

  async function copyHook(text: string, index: number) {
    await navigator.clipboard.writeText(text);
    setCopied(index);
    window.setTimeout(() => setCopied(null), 1500);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Content Lab home">
          <span className="brand-mark">CL</span>
          <span>CONTENT LAB</span>
        </a>
        <div className="nav-links">
          <a href="#tools">Tools</a>
          <a href="#manifesto">Manifesto</a>
          <a className="nav-cta" href="#generator">Build your next post <span>↗</span></a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="pulse" /> A free toolkit for creators who ship</div>
        <h1>Make content<br /><em>people stop for.</em></h1>
        <p className="hero-copy">High-signal tools to find the angle, write the hook and move from blank page to published — without the generic fluff.</p>
        <div className="hero-actions">
          <a className="button primary" href="#generator">Try the Hook Lab <span>↓</span></a>
          <a className="button text-button" href="#manifesto">Why we made it <span>→</span></a>
        </div>
        <div className="hero-proof"><span>Made for the daily practice.</span><span className="proof-line" /><span>Free forever.</span></div>
      </section>

      <section className="tool-shell" id="generator">
        <div className="tool-heading">
          <div>
            <p className="tool-index">01 / THE HOOK LAB</p>
            <h2>Your next post starts here.</h2>
          </div>
          <button className="shuffle" onClick={() => setRefresh((value) => value + 1)}>↻ Shuffle angles</button>
        </div>

        <div className="tool-grid">
          <aside className="controls" aria-label="Hook settings">
            <label>Platform</label>
            <div className="segmented">
              {(Object.keys(platformTips) as Platform[]).map((item) => <button className={platform === item ? "active" : ""} key={item} onClick={() => setPlatform(item)}>{item}</button>)}
            </div>
            <label>Voice</label>
            <div className="voice-list">
              {(Object.keys(hooks) as Tone[]).map((item) => <button className={tone === item ? "selected" : ""} key={item} onClick={() => setTone(item)}><span className="radio" />{item}</button>)}
            </div>
            <label htmlFor="audience">Your audience</label>
            <input id="audience" value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="e.g. independent creators" />
            <label htmlFor="outcome">The transformation</label>
            <input id="outcome" value={outcome} onChange={(event) => setOutcome(event.target.value)} placeholder="e.g. videos that convert" />
          </aside>

          <div className="results">
            <div className="result-topline"><span>3 directions for {platform}</span><span>LIVE PREVIEW</span></div>
            <div className="hook-list">
              {results.map((result, index) => (
                <article className="hook-card" key={result}>
                  <span className="hook-number">0{index + 1}</span>
                  <p>{result}</p>
                  <button onClick={() => copyHook(result, index)} aria-label={`Copy hook ${index + 1}`}>{copied === index ? "Copied" : "Copy"} <span>↗</span></button>
                </article>
              ))}
            </div>
            <div className="tip"><span>✦</span><p><strong>Platform note.</strong> {platformTips[platform]}</p></div>
          </div>
        </div>
      </section>

      <section className="tools" id="tools">
        <div className="section-lead"><p className="tool-index">THE FULL KIT / SHIPPING WEEKLY</p><h2>Useful by design.<br />Never bloated.</h2></div>
        <div className="tool-cards">
          <article><span className="card-number">02</span><span className="card-icon">✳</span><h3>CTA Library</h3><p>Calls to action that fit the platform, the moment and the relationship.</p><span className="status">NEXT UP</span></article>
          <article><span className="card-number">03</span><span className="card-icon">⌁</span><h3>Caption Check</h3><p>A sharp second opinion before you hit publish.</p><span className="status">IN THE LAB</span></article>
          <article><span className="card-number">04</span><span className="card-icon">□</span><h3>Format Vault</h3><p>Repeatable content systems, built from ideas that already work.</p><span className="status">IN THE LAB</span></article>
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <p className="tool-index">A SMALL MANIFESTO</p>
        <blockquote>“The goal isn’t to make more content.<br /><em>It’s to make the right next piece.</em>”</blockquote>
        <p className="manifesto-copy">Content Lab is an open, evolving set of tools for people who care about the work. No growth hacks. No recycled prompts. Just a better place to start.</p>
      </section>

      <footer><a className="brand" href="#top"><span className="brand-mark">CL</span><span>CONTENT LAB</span></a><span>Built in public · 2026</span><a href="#generator">Back to the lab ↑</a></footer>
    </main>
  );
}
