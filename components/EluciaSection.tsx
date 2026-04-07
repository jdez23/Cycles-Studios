"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import LaptopFrame from "./LaptopFrame";
import WireframeGrid from "./WireframeGrid";
import CharacterHeatmap from "./CharacterHeatmap";
import type { Project } from "@/lib/projects";

const FEATURES = [
  "Visual guided workflows",
  "Conversational learning interface",
  "Instrument-specific exploration",
];

export default function EluciaSection({ project }: { project: Project }) {
  const [burstTriggered, setBurstTriggered] = useState(false);
  const accent = project.color; // #3bc26f

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.9, ease: [0.25, 0, 0, 1] }}
      onViewportEnter={() => setBurstTriggered(true)}
      className="relative border-t border-white/5 overflow-hidden"
      style={{ backgroundColor: "#F0EEE9" }}
    >
      {/* Wireframe grid as background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <WireframeGrid />
      </div>

      {/* Character heatmap layer */}
      <CharacterHeatmap triggerBurst={burstTriggered} />

      {/* Section-wide accent glow — anchored to the right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 65% at 72% 50%, ${accent}0d 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-20 mx-auto w-full max-w-[1120px] px-8 md:px-16 pt-8 md:pt-12">
        <div className="flex flex-col gap-2">
          <span
            className="text-[24px] md:text-[32px] font-black uppercase tracking-tight"
            style={{ color: "black" }}
          >
            {project.index}
          </span>
          <span
            className="uppercase tracking-[0.35em] font-semibold"
            style={{ fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(0,0,0,0.88)" }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/*
        Layout strategy:
        Mobile  → flex-col (DOM order = display order: A → B → C)
        Desktop → 2-col grid; B (visual) occupies col-2 and spans both implicit rows
                  so A sits at col-1/row-1 and C at col-1/row-2, forming a
                  continuous text column alongside the full-height visual.
      */}
      <div className="relative z-10 flex flex-col md:grid md:grid-cols-[5fr_7fr] md:items-center md:min-h-[680px] px-8 md:px-16 py-20 md:py-28 gap-12 md:gap-0 mt-8">

        <div className="flex flex-col gap-7 md:pr-16 md:justify-center">

          {/* One-liner statement */}
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
            className="font-medium text-black tracking-wide"
            style={{ fontSize: "clamp(14px, 1.3vw, 17px)" }}
          >
            Learning instruments, reimagined.
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0, 0, 1] }}
            className="text-black/70 text-sm leading-[1.85] max-w-[340px]"
          >
            Elucia transforms static instrument manuals into dynamic,
            AI-guided learning experiences — helping musicians explore
            complex gear with more intuition and less friction.
          </motion.p>

          {/* Feature bullets */}
          <motion.ul
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0, 0, 1] }}
            className="flex flex-col gap-3"
          >
            {FEATURES.map((feat, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                  style={{ background: accent }}
                />
                <span className="text-[11px] tracking-[0.18em] uppercase text-black/60">
                  {feat}
                </span>
              </li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0, 0, 1] }}
            className="self-start group flex items-center gap-2 mt-1"
            whileHover={{ x: 3, transition: { duration: 0.2, ease: "easeOut" } }}
          >
            <span className="text-[10px] tracking-[0.3em] uppercase text-black/50 group-hover:text-black/80 transition-colors duration-200">
              Explore Project
            </span>
            <span className="text-[11px] text-black/40 group-hover:text-black/60 transition-colors duration-200">
              →
            </span>
          </motion.button>
        </div>

        {/* ── B: Visual ──────────────────────────────────────────────── */}
        {/* Mobile: 2nd in stack (between title and body)                */}
        {/* Desktop: col-2, row-span-2 — fills the full right column     */}
        <div className="relative flex items-center justify-center md:col-start-2 md:row-start-1 md:row-span-2">

          {/* Floating card: AI Guide — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0, 0, 1] }}
            className="absolute top-[16%] left-[4%] hidden md:block z-20"
            style={{ width: 148 }}
          >
            <div
              className="rounded-xl p-3"
              style={{
                background: "rgba(14,14,14,0.88)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                  style={{ background: accent }}
                />
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/30">
                  AI Guide
                </span>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                &quot;Walk me through
                <br />
                the filter section&quot;
              </p>
            </div>
          </motion.div>

          {/* Floating card: Instrument progress — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 0.6, ease: [0.25, 0, 0, 1] }}
            className="absolute bottom-[20%] right-[4%] hidden md:block z-20"
            style={{ width: 140 }}
          >
            <div
              className="rounded-xl p-3"
              style={{
                background: "rgba(14,14,14,0.88)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(16px)",
              }}
            >
              <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 mb-1.5">
                Instrument
              </p>
              <p className="text-[12px] font-semibold text-white/60 mb-2.5">
                Rhodes Mk. II
              </p>
              <div
                className="h-[2px] rounded-full overflow-hidden mb-1.5"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ width: "68%", background: accent }}
                />
              </div>
              <p className="text-[9px] text-white/25">68% explored</p>
            </div>
          </motion.div>

          {/* Phone cluster */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0, 0, 1] }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <LaptopFrame accentColor={accent}>
              <Image
                src="/product/elucia.png"
                alt={`${project.name} screenshot`}
                fill
                className="object-cover"
              />
            </LaptopFrame>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
