"use client";

import { useMemo, useState } from "react";

type Platform = "TikTok" | "Instagram" | "YouTube" | "X";
type Tone = "Bold" | "Educational" | "Personal" | "Contrarian";
type Angle = "Teach" | "Story" | "Take" | "System";

const hooks: Record<Tone, string[]> = {
  Bold: ["Stop {doing} if you want {outcome}.", "The {audience} playbook nobody gives you for free:", "You do not need more {thing}. You need this."],
  Educational: ["The 3-step framework I use to get {outcome}:", "Here is the simplest way to improve your {thing} this week.", "Save this: a practical guide to {outcome}."],
  Personal: ["I wasted years doing {doing}. Here is what changed.", "What I wish I knew before trying to get {outcome}.", "A small decision changed how I approach {thing}."],
  Contrarian: ["Unpopular opinion: {doing} is not how you get {outcome}.", "Most advice about {thing} is backwards.", "You are probably optimizing the wrong part of {thing}."]
};

const platformTips: Record<Platform, string> = {
  TikTok: "Open with the tension in the first second. Skip the intro.",
  Instagram: "Pair this with a clean cover and a line break after the hook.",
  YouTube: "Turn the promise into visual proof within the first 15 seconds.",
  X: "Make the first line stand alone. Build the rest as a clean thread."
};

const angleData: Record<Angle, { eyebrow: string; title: string; detail: string; prompt: (idea: string, audience: string) => string }> = {
  Teach: { eyebrow: "MAKE IT USEFUL", title: "The useful angle", detail: "Turn the idea into a compact lesson with a clear, save-worthy takeaway.", prompt: (idea, audience) => `A practical 3-step guide for ${audience}: ${idea}.` },
  Story: { eyebrow: "MAKE IT HUMAN", title: "The story angle", detail: "Use one moment of friction, change or discovery to make the point memorable.", prompt: (idea) => `The moment I stopped doing ${idea} the old way.` },
  Take: { eyebrow: "MAKE IT FELT", title: "The point-of-view angle", detail: "Take a specific stance that creates productive tension without manufactured outrage.", prompt: (idea) => `Most people are getting ${idea} wrong. Here is why.` },
  System: { eyebrow: "MAKE IT REPEATABLE", title: "The system angle", detail: "Give the audience a simple framework they can return to and make their own.", prompt: (idea) => `The small system behind ${idea} that compounds over time.` }
};

function field(value: string, fallback: string) {
  return value.trim() || fallback;
}

export default function Home() {
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [tone, setTone] = useState<Tone>("Bold");
  const [audience, setAudience] = useState("creators");
  const [outcome, setOutcome] = useState("better content");
  const [idea, setIdea] = useState("turning one idea into a week of posts");
  const [angle, setAngle] = useState<Angle>("Teach");
  const [copied, setCopied] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [experimentDone, setExperimentDone] = useState(false);

  const results = useMemo(() => {
    const collection = hooks[tone];
    return [0, 1, 2].map((offset) => {
      const template = collection[(offset + refresh) % collection.length];
      return template.replace("{audience}", field(audience, "creators")).replaceAll("{outcome}", field(outcome, "better content")).replaceAll("{thing}", field(outcome, "content")).replaceAll("{doing}", "copying what everyone else does");
    });
  }, [audience, outcome, refresh, tone]);

  const activeAngle = angleData[angle];
  const selectedHook = results[0];
  const brief = `FORMAT: ${platform} short-form\n\nOPEN\n${selectedHook}\n\nANGLE\n${activeAngle.prompt(field(idea, "your idea"), field(audience, "creators"))}\n\nBEATS\n01. Name the tension\n02. Show the useful shift\n03. Leave one clear next move\n\nCLOSE\nAsk: “Which part are you changing first?”`;

  async function copyText(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 1500);
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Content Lab home"><span className="brand-mark">CL</span><span>CONTENT LAB</span></a>
        <div className="nav-links"><a href="#workflow">Workflow</a><a href="#tools">Tools</a><a className="nav-cta" href="#generator">Build your next post <span>↗</span></a></div>
      </nav>

      <section className="hero" id="top">
        <div className="eyebrow"><span className="pulse" /> A free toolkit for creators who ship</div>
        <h1>Make content<br /><em>people stop for.</em></h1>
        <p className="hero-copy">High-signal tools to find the angle, write the hook and move from blank page to published — without the generic fluff.</p>
        <div className="hero-actions"><a className="button primary" href="#generator">Try the Hook Lab <span>↓</span></a><a className="button text-button" href="#workflow">See the workflow <span>→</span></a></div>
        <div className="hero-proof"><span>Made for the daily practice.</span><span className="proof-line" /><span>Free forever.</span></div>
      </section>

      <section className="tool-shell" id="generator">
        <div className="tool-heading"><div><p className="tool-index">01 / THE HOOK LAB</p><h2>Your next post starts here.</h2></div><button className="shuffle" onClick={() => setRefresh((value) => value + 1)}>↻ Shuffle angles</button></div>
        <div className="tool-grid">
          <aside className="controls" aria-label="Hook settings">
            <label>Platform</label><div className="segmented">{(Object.keys(platformTips) as Platform[]).map((item) => <button className={platform === item ? "active" : ""} key={item} onClick={() => setPlatform(item)}>{item}</button>)}</div>
            <label>Voice</label><div className="voice-list">{(Object.keys(hooks) as Tone[]).map((item) => <button className={tone === item ? "selected" : ""} key={item} onClick={() => setTone(item)}><span className="radio" />{item}</button>)}</div>
            <label htmlFor="audience">Your audience</label><input id="audience" value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="e.g. independent creators" />
            <label htmlFor="outcome">The transformation</label><input id="outcome" value={outcome} onChange={(event) => setOutcome(event.target.value)} placeholder="e.g. videos that convert" />
          </aside>
          <div className="results">
            <div className="result-topline"><span>3 directions for {platform}</span><span>LIVE PREVIEW</span></div>
            <div className="hook-list">{results.map((result, index) => <article className="hook-card" key={result}><span className="hook-number">0{index + 1}</span><p>{result}</p><button onClick={() => copyText(result, `hook-${index}`)} aria-label={`Copy hook ${index + 1}`}>{copied === `hook-${index}` ? "Copied" : "Copy"} <span>↗</span></button></article>)}</div>
            <div className="tip"><span>✦</span><p><strong>Platform note.</strong> {platformTips[platform]}</p></div>
          </div>
        </div>
      </section>

      <section className="angle-lab" id="workflow">
        <div className="section-kicker"><p className="tool-index">02 / ANGLE FINDER</p><p className="section-note">One idea. Four honest directions.</p></div>
        <div className="angle-head"><h2>Do not chase more ideas.<br /><em>Find the right lens.</em></h2><div className="idea-field"><label htmlFor="idea">Your raw idea</label><input id="idea" value={idea} onChange={(event) => setIdea(event.target.value)} /></div></div>
        <div className="angle-grid">
          {(Object.keys(angleData) as Angle[]).map((item, index) => <button className={`angle-card ${angle === item ? "angle-active" : ""}`} key={item} onClick={() => setAngle(item)}><span>0{index + 1}</span><h3>{item}</h3><p>{angleData[item].detail}</p><i>→</i></button>)}
          <article className="angle-output"><p className="tool-index">{activeAngle.eyebrow}</p><h3>{activeAngle.title}</h3><p className="angle-line">{activeAngle.prompt(field(idea, "your idea"), field(audience, "creators"))}</p><button className="ink-button" onClick={() => copyText(activeAngle.prompt(field(idea, "your idea"), field(audience, "creators")), "angle")}>{copied === "angle" ? "Copied angle" : "Use this direction"} <span>↗</span></button></article>
        </div>
      </section>

      <section className="brief-lab">
        <div className="brief-heading"><div><p className="tool-index">03 / CONTENT BRIEF</p><h2>From direction<br />to <em>done.</em></h2></div><p>A practical page to take into your recording session. No unnecessary tabs, no disappearing context.</p></div>
        <div className="brief-grid">
          <aside className="brief-rail"><span className="rail-label">YOUR LIVE STACK</span><div><span>01</span><p>Hook</p><strong>{selectedHook}</strong></div><div><span>02</span><p>Angle</p><strong>{angle}</strong></div><div><span>03</span><p>Platform</p><strong>{platform}</strong></div></aside>
          <article className="brief-paper"><div className="brief-paper-top"><span>CONTENT LAB / BRIEF</span><span>READY TO RECORD</span></div><pre>{brief}</pre><div className="brief-actions"><button onClick={() => copyText(brief, "brief")}>{copied === "brief" ? "Brief copied" : "Copy brief"} <span>↗</span></button><span>LESS FRICTION. MORE MAKING.</span></div></article>
        </div>
      </section>

      <section className="remix-lab">
        <div className="remix-heading"><p className="tool-index">04 / REMIX STUDIO</p><h2>One strong idea.<br /><em>More than one life.</em></h2><p>Adapt the intent — not just the words — to the native behavior of each platform.</p></div>
        <div className="remix-grid">
          <article className="remix-feature"><span className="remix-number">01</span><p className="tool-index">CURRENT SOURCE</p><h3>{activeAngle.prompt(field(idea, "your idea"), field(audience, "creators"))}</h3><span className="source-tag">{platform} / {tone}</span></article>
          <article className="remix-card"><span>02</span><h3>Carousel</h3><p>Turn the idea into five clean slides: tension, shift, framework, example, next move.</p><button onClick={() => copyText(`Carousel: ${activeAngle.prompt(field(idea, "your idea"), field(audience, "creators"))}`, "carousel")}>{copied === "carousel" ? "Copied" : "Copy outline"} ↗</button></article>
          <article className="remix-card"><span>03</span><h3>Thread</h3><p>Lead with the take, earn attention with proof, then make the final line worth saving.</p><button onClick={() => copyText(`Thread: ${selectedHook}`, "thread")}>{copied === "thread" ? "Copied" : "Copy opener"} ↗</button></article>
          <article className="remix-card"><span>04</span><h3>Email</h3><p>Start with the human context, give the lesson room to breathe, end with one question.</p><button onClick={() => copyText(`Email subject: ${selectedHook}`, "email")}>{copied === "email" ? "Copied" : "Copy subject"} ↗</button></article>
        </div>
      </section>

      <section className="experiment-lab">
        <div><p className="tool-index">05 / EXPERIMENT BOARD</p><h2>Publish. Learn.<br />Make the <em>next one</em> sharper.</h2></div>
        <div className="experiment-card"><div className="experiment-top"><span>ACTIVE EXPERIMENT</span><span className={experimentDone ? "done-dot" : "live-dot"}>{experimentDone ? "LOGGED" : "READY"}</span></div><h3>{selectedHook}</h3><dl><div><dt>Hypothesis</dt><dd>A clearer point of view earns stronger saves.</dd></div><div><dt>Measure</dt><dd>Saves / reach after 48h</dd></div><div><dt>Learn</dt><dd>{experimentDone ? "Logged. Compare it with your next angle." : "Waiting for the post to ship."}</dd></div></dl><button className="experiment-button" onClick={() => setExperimentDone((value) => !value)}>{experimentDone ? "Reopen experiment" : "Mark as published"} <span>↗</span></button></div>
      </section>

      <section className="tools" id="tools"><div className="section-lead"><p className="tool-index">THE FULL KIT / SHIPPING WEEKLY</p><h2>Useful by design.<br />Never bloated.</h2></div><div className="tool-cards"><article><span className="card-number">06</span><span className="card-icon">✳</span><h3>CTA Library</h3><p>Calls to action that fit the platform, the moment and the relationship.</p><span className="status">NEXT UP</span></article><article><span className="card-number">07</span><span className="card-icon">⌁</span><h3>Caption Check</h3><p>A sharp second opinion before you hit publish.</p><span className="status">IN THE LAB</span></article><article><span className="card-number">08</span><span className="card-icon">□</span><h3>Voice DNA</h3><p>A durable point of view for every post that follows.</p><span className="status">IN THE LAB</span></article></div></section>

      <section className="manifesto" id="manifesto"><p className="tool-index">A SMALL MANIFESTO</p><blockquote>“The goal isn’t to make more content.<br /><em>It’s to make the right next piece.</em>”</blockquote><p className="manifesto-copy">Content Lab is an open, evolving set of tools for people who care about the work. No growth hacks. No recycled prompts. Just a better place to start.</p></section>
      <footer><a className="brand" href="#top"><span className="brand-mark">CL</span><span>CONTENT LAB</span></a><span>Built in public · 2026</span><a href="#generator">Back to the lab ↑</a></footer>
    </main>
  );
}
