import React, { useState } from "react";

export default function KmaComparison() {
  const [originalVisible, setOriginalVisible] = useState(50);
  function revealFromPointer(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setOriginalVisible(
      Math.round(
        Math.max(
          0,
          Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100),
        ),
      ),
    );
  }
  return (
    <figure
      className="kma-comparison"
      aria-label="KMA before and after website comparison"
    >
      <div className="comparison-toolbar">
        <span>Compare the original homepage with my redesign.</span>
        <div role="group" aria-label="Choose comparison view">
          {[
            ["Before", 100],
            ["Compare", 50],
            ["After", 0],
          ].map(([label, value]) => (
            <button
              key={label}
              type="button"
              aria-pressed={originalVisible === value}
              onClick={() => setOriginalVisible(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div
        className="comparison-stage"
        style={{ "--original-visible": originalVisible + "%" }}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          revealFromPointer(event);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            revealFromPointer(event);
        }}
      >
        <img
          src="/work/kma-after.jpg"
          width="1265"
          height="720"
          alt="After: the independently redesigned KMA homepage"
        />
        <img
          className="comparison-original"
          src="/work/kma-before.jpg"
          width="1265"
          height="720"
          alt="Before: KMA’s original homepage"
          style={{ clipPath: `inset(0 ${100 - originalVisible}% 0 0)` }}
        />
        {originalVisible > 8 && (
          <span className="comparison-label before">Before / Original</span>
        )}
        {originalVisible < 92 && (
          <span className="comparison-label after">After / Concept</span>
        )}
        {originalVisible > 0 && originalVisible < 100 && (
          <span className="comparison-divider" aria-hidden="true">
            <span>↔</span>
          </span>
        )}
      </div>
      <div className="comparison-control">
        <label htmlFor="kma-reveal">Reveal the original website</label>
        <input
          id="kma-reveal"
          type="range"
          min="0"
          max="100"
          value={originalVisible}
          onChange={(event) => setOriginalVisible(Number(event.target.value))}
          aria-valuetext={`${originalVisible}% original, ${100 - originalVisible}% redesign`}
        />
      </div>
      <figcaption>
        Desktop captures · October 18, 2026. Slide, tap a view, or use the arrow
        keys to compare.
      </figcaption>
    </figure>
  );
}
