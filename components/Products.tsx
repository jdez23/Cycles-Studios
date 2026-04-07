"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Carousel from "./Carousel";
import IPhoneFrame from "./IPhoneFrame";
import WireframeGrid from "./WireframeGrid";
import CharacterHeatmap from "./CharacterHeatmap";
import { projects } from "@/lib/projects";
import IMacFrame from "./IMacFrame";
import BrowserChrome from "./BrowserChrome";

export default function Products() {
  return (
    <section id="products">
      {projects.map((project) => (
        <ProjectSection key={project.slug} project={project} />
      ))}
    </section>
  );
}

function ProjectSection({
  project,
}: {
  project: (typeof projects)[number];
}) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [burstTriggered, setBurstTriggered] = useState(false);
  const slide = project.slides[current];
  const subtitleLines =
    project.slug === "cycles" && slide.lines?.[0]?.toLowerCase() === project.name.toLowerCase()
      ? slide.lines.slice(1)
      : slide.lines;

  const prev = () => { setDirection(-1); setCurrent((c) => (c - 1 + project.slides.length) % project.slides.length); };
  const next = () => { setDirection(1); setCurrent((c) => (c + 1) % project.slides.length); };

  const accent = project.color;
  const isLightSection = project.slug === "cycles" || project.slug === "elucia";
  const isHighlightedTextSection = project.slug === "cycles" || project.slug === "elucia";
  const highlightBg = project.slug === "cycles" ? "#FF5C00" : accent;
  const sectionBg = project.slug === "midime" ? "#000000" : "#F0EEE9";
  const titleColor = isLightSection ? "black" : "white";
  const subtitleColor = isLightSection ? "black" : "rgba(255,255,255,0.88)";

  // Cycles: tighter gap so absolute arrows (left-6/right-6) never overlap content
  const desktopGap = project.slug === "cycles" ? "md:gap-x-14" : "md:gap-x-16";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      onViewportEnter={() => setBurstTriggered(true)}
      className="relative border-t border-white/5 overflow-hidden"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="absolute inset-0 opacity-40 pointer-events-none z-10">
        <WireframeGrid />
      </div>
      <div className="absolute inset-0 z-0">
        <CharacterHeatmap triggerBurst={burstTriggered} />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 55% 65% at 72% 50%, ${accent}0d 0%, transparent 60%)` }}
      />

      {/* Index number */}
      <div className="relative z-30 mx-auto w-full max-w-[1120px] px-6 md:px-14 pt-10 md:pt-14 flex justify-center md:justify-start">
        <span
          className="text-[22px] md:text-[28px] font-black uppercase tracking-tight"
          style={{ color: sectionBg, WebkitTextStroke: isLightSection ? "1.5px black" : "1.5px white" }}
        >
          {project.index}
        </span>
      </div>

      {/* Main content grid */}
      <div
        className={`relative z-20 mx-auto w-full max-w-[1120px] flex flex-col items-center md:grid md:items-center ${project.slug === "cycles" ? "md:min-h-[760px]" : "md:min-h-[840px]"} px-6 md:px-14 pb-16 md:pb-32 gap-8 ${desktopGap} mt-6 md:mt-00`}
        style={{ gridTemplateColumns: "auto auto", justifyContent: "center" }}
      >

        {/* ── A: Text column ────────────────────────────────────────── */}
        <div
          className={`flex flex-col items-center md:items-start text-center md:text-left gap-5 md:gap-8 w-full max-w-sm md:max-w-[300px] md:self-center z-30${project.slug === "midime" ? " md:order-last" : ""
            }`}
        >
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.9, ease: [0.25, 0, 0, 1] }}
            className="font-black uppercase tracking-[-0.04em] leading-[0.92]"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", color: titleColor }}
          >
            {project.name}
          </motion.h2>

          <div className={`${isHighlightedTextSection ? "relative overflow-hidden" : "overflow-hidden"} w-full ${project.slug === "cycles" ? "max-w-[220px] md:max-w-none mx-auto md:mx-0" : ""}`}>
            {isHighlightedTextSection && (
              <motion.div className="absolute inset-0" style={{ background: highlightBg }} />
            )}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0, 0, 1] }}
              className={`relative ${isHighlightedTextSection ? "px-4 py-4 md:px-5 md:py-5" : ""} text-[clamp(14px,2.2vw,26px)] leading-[1.15] font-semibold uppercase`}
              style={{ color: subtitleColor }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, x: direction >= 0 ? 48 : -48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction >= 0 ? -48 : 48 }}
                  transition={{ duration: 0.42, ease: [0.25, 0, 0, 1] }}
                >
                  {subtitleLines && subtitleLines.length > 0 ? (
                    subtitleLines.map((line, i) => <span key={i} className="block">{line}</span>)
                  ) : (
                    <span className="normal-case font-medium text-[clamp(13px,1.4vw,15px)] leading-relaxed opacity-80">
                      {project.description}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Cycles: App Store badge — desktop only */}
          {project.slug === "cycles" && (
            <div className="hidden md:block max-w-[140px]">
              <a href="https://apps.apple.com/us/app/cycles-discover-playlists/id6446672039" target="_blank" rel="noopener noreferrer">
                <Image src="/applelogo.png" alt="Apple App Store badge" width={120} height={38} className="h-auto w-full object-contain" />
              </a>
            </div>
          )}

          {/* midime/elucia: View Website — desktop only */}
          {project.slug === "midime" && (
            <div className="hidden md:block">
              <a href="https://midime.xyz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-[10px] tracking-[0.25em] uppercase text-white/60 transition-colors duration-200 hover:border-white/60 hover:text-white">
                View Website
              </a>
            </div>
          )}
          {project.slug === "elucia" && (
            <div className="hidden md:block">
              <a href="https://elucia.xyz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-black/25 px-6 py-3 text-[10px] tracking-[0.25em] uppercase text-black/50 transition-colors duration-200 hover:border-black/50 hover:text-black/80">
                View Website
              </a>
            </div>
          )}
        </div>

        {/* ── B: Mockup column ──────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center gap-5 w-full md:w-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0, 0, 1] }}
            className="relative z-10 flex flex-col items-center gap-5 w-full md:w-auto"
          >
            {project.slug === "cycles" ? (
              <>
                <motion.div className="relative" initial="rest" whileHover="hover" animate="rest">
                  <motion.div
                    variants={{ rest: { opacity: 0, scaleX: 0.7 }, hover: { opacity: 1, scaleX: 1 } }}
                    transition={{ duration: 0.35 }}
                    className="absolute -bottom-5 inset-x-[8%] h-10 blur-2xl rounded-full pointer-events-none"
                    style={{ background: accent }}
                  />
                  <IPhoneFrame accentColor={accent}>
                    <Carousel slides={project.slides} accentColor={accent} value={current} direction={direction} />
                  </IPhoneFrame>
                </motion.div>

                {/* Dots + counter — mobile only (desktop version is absolute at section bottom) */}
                <div className="relative flex items-center justify-center w-[260px] md:hidden">
                  <button
                    onClick={prev}
                    aria-label="Previous slide"
                    className="md:hidden absolute left-0 w-7 h-7 flex items-center justify-center rounded-full bg-black/[0.07] hover:bg-black/[0.13] transition-colors duration-200"
                  >
                    <span className="text-black/60 text-xs leading-none">←</span>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {project.slides.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} className="py-2 px-1">
                          <motion.div
                            animate={{ width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.2 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="h-px rounded-full"
                            style={{ background: i === current ? accent : "black" }}
                          />
                        </button>
                      ))}
                    </div>
                    <span className="text-[9px] tracking-[0.2em] text-black/20 tabular-nums">
                      {String(current + 1).padStart(2, "0")} / {String(project.slides.length).padStart(2, "0")}
                    </span>
                  </div>
                  <button
                    onClick={next}
                    aria-label="Next slide"
                    className="md:hidden absolute right-0 w-7 h-7 flex items-center justify-center rounded-full bg-black/[0.07] hover:bg-black/[0.13] transition-colors duration-200"
                  >
                    <span className="text-black/60 text-xs leading-none">→</span>
                  </button>
                </div>

                {/* Mobile-only: Apple badge below iPhone */}
                <div className="md:hidden max-w-[120px]">
                  <a href="https://apps.apple.com/us/app/cycles-discover-playlists/id6446672039" target="_blank" rel="noopener noreferrer">
                    <Image src="/applelogo.png" alt="Apple App Store badge" width={120} height={38} className="h-auto w-full object-contain" />
                  </a>
                </div>
              </>
            ) : (
              /* iMac — fixed width on desktop so the auto column never collapses */
              <motion.div
                className="relative w-full max-w-[min(540px,calc(100vw-3rem))] md:w-[560px] md:flex-shrink-0 lg:w-[600px]"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.div
                  variants={{ rest: { opacity: 0, scaleX: 0.7 }, hover: { opacity: 1, scaleX: 1 } }}
                  transition={{ duration: 0.35 }}
                  className="absolute -bottom-5 inset-x-[10%] h-10 blur-2xl rounded-full pointer-events-none"
                  style={{ background: accent }}
                />
                <IMacFrame accentColor={accent}>
                  <BrowserChrome url={`${project.slug}.com`}>
                    <Image src={`/product/${project.slug}.png`} alt={`${project.name} screen`} fill className="object-cover" />
                  </BrowserChrome>
                </IMacFrame>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ── C: Mobile-only CTA below mockup ───────────────────────── */}
        {(project.slug === "midime" || project.slug === "elucia") && (
          <div className="md:hidden flex justify-center w-full">
            {project.slug === "midime" ? (
              <a href="https://midime.xyz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-[10px] tracking-[0.25em] uppercase text-white/60 transition-colors duration-200 hover:border-white/60 hover:text-white">
                View Website
              </a>
            ) : (
              <a href="https://elucia.xyz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-black/25 px-6 py-3 text-[10px] tracking-[0.25em] uppercase text-black/50 transition-colors duration-200 hover:border-black/50 hover:text-black/80">
                View Website
              </a>
            )}
          </div>
        )}

      </div>

      {/* Desktop-only indicator bars + counter — Cycles only */}
      {project.slug === "cycles" && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2">
            {project.slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} className="py-2 px-1">
                <motion.div
                  animate={{ height: i === current ? 10 : 6, width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.2 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-px rounded-full"
                  style={{ background: i === current ? accent : "black" }}
                />
              </button>
            ))}
          </div>
          <span className="text-[9px] tracking-[0.2em] text-black/20 tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(project.slides.length).padStart(2, "0")}
          </span>
        </div>
      )}

      {/* Desktop-only carousel arrows — Cycles only */}
      {project.slug === "cycles" && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 hidden md:flex items-center justify-center rounded-full bg-black/[0.07] hover:bg-black/[0.13] transition-colors duration-200"
          >
            <span className="text-black text-base leading-none">←</span>
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 hidden md:flex items-center justify-center rounded-full bg-black/[0.07] hover:bg-black/[0.13] transition-colors duration-200"
          >
            <span className="text-black text-base leading-none">→</span>
          </button>
        </>
      )}
    </motion.div>
  );
}
