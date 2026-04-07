"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WalkingFigures from "./WalkingFigures";
import CharacterHeatmap from "./CharacterHeatmap";

export default function About() {
  const [burstTriggered, setBurstTriggered] = useState(false);

  return (
    <motion.section
      id="aboutme"
      className="relative w-full pt-24 pb-20 px-6 md:pt-36 md:pb-28 md:px-16 border-t border-white/5 overflow-hidden flex items-center min-h-[560px] md:min-h-[680px] bg-black"
      onViewportEnter={() => setBurstTriggered(true)}
    >
      {/* Character heatmap layer */}
      <CharacterHeatmap triggerBurst={burstTriggered} />

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-7xl mx-auto w-full">
        {/* Left: heading */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.9, ease: [0.25, 0, 0, 1] }}
            className="font-black uppercase tracking-tight leading-[0.85]"
            style={{
              fontSize: "clamp(52px, 8vw, 96px)",
              WebkitTextStroke: "1px #fff",
              color: "#000000",
            }}
          >
            Who
            <br />
            <span className="inline-block mt-2 md:mt-4">We Are</span>
          </motion.h2>
        </div>

        {/* Right: copy */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0, 0, 1] }}
          className="flex flex-col gap-8 pt-4"
        >
          <p className="text-base text-white/70 leading-relaxed">
            Cycles Studios is a creative lab operating at the intersection
            of music and technology.
          </p>
          <p className="text-base text-white/50 leading-relaxed">
            We build products, services, and experiences that give artists
            ways to create, connect, and be heard. Combining culture with code
            to push what&apos;s possible in the music space.
          </p>
        </motion.div>
      </div>

      {/* Signal figure — ambient procession across the bottom */}
      <WalkingFigures />
    </motion.section>
  );
}
