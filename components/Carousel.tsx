"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export interface Slide {
  label: string;
  image?: string;
  lines?: string[];
}

interface CarouselProps {
  slides: Slide[];
  accentColor: string;
  value: number;
  direction: number;
}

const DURATION = 0.48;
const EASE = [0.32, 0, 0.15, 1] as const;

export default function Carousel({ slides, accentColor, value, direction: dir }: CarouselProps) {
  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 1 }),
    center: { x: "0%", opacity: 1, transition: { duration: DURATION, ease: EASE } },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 1, transition: { duration: DURATION, ease: EASE } }),
  };

  const slide = slides[value];

  return (
    // Image fills the iPhone screen — no wrapper div needed
    <div className="relative w-full h-full overflow-hidden bg-[#0e0e0e]">
      <AnimatePresence custom={dir} mode="sync" initial={false}>
        <motion.div
          key={value}
          custom={dir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {slide.image ? (
            <Image
              src={slide.image}
              alt={slide.label}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 50% 45%, ${accentColor}18, transparent 70%)`,
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
