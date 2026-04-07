"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import WireframeGrid from "./WireframeGrid";
import CharacterHeatmap from "./CharacterHeatmap";

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Grid fades in
    tl.fromTo(
      gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2 }
    );

    // Title words stagger up
    const words = titleRef.current?.querySelectorAll(".word");
    if (words) {
      tl.fromTo(
        words,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
        "-=0.5"
      );
    }

    // Subtitle fades in
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.3"
    );

    // Scroll cue
    tl.fromTo(
      scrollCueRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.2"
    );
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background flex items-center justify-center">
      {/* Wireframe grid layer */}
      <div ref={gridRef} className="absolute inset-0 opacity-0">
        <WireframeGrid />
      </div>

      {/* Character heatmap layer */}
      <CharacterHeatmap />

      {/* Text content */}
      <div className="relative z-10 text-center px-6 select-none">
        <div
          ref={titleRef}
          className="overflow-hidden"
          style={{ lineHeight: 0.9 }}
        >
          <span
            className="word inline-block font-black uppercase tracking-tight text-white leading-none"
            style={{ fontSize: "clamp(48px, 13vw, 180px)", opacity: 0 }}
          >
            Cycles
          </span>
          <br />
          <span
            className="word inline-block font-black uppercase tracking-tight text-white leading-none"
            style={{ fontSize: "clamp(48px, 13vw, 180px)", opacity: 0 }}
          >
            Studios
          </span>
        </div>

        <p
          ref={subtitleRef}
          className="mt-6 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.35em] uppercase text-white/30 opacity-0"
        >
          Music &times; Technology &times; Culture
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-8 opacity-0 flex items-center gap-3"
      >
        <span className="text-white/20 text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-white/10" />
      </div>
    </section>
  );
}
