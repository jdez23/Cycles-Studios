"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Nav() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.8]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((v) => setScrolled(v > 20));
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/5"
      style={{
        backgroundColor: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/cycles-human.png"
          alt="Cycles human logo"
          width={30}
          height={30}
          className="h-[30px] w-[30px] object-contain"
        />
        <span className="text-sm font-bold tracking-[0.25em] uppercase text-white/90">
          Cycles Studios
        </span>
      </div>

      <div className="flex items-center gap-8">
        <a
          href="#aboutme"
          className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
        >
          About Me
        </a>
        <a
          href="#products"
          className="text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors duration-300"
        >
          Products
        </a>
      </div>
    </motion.nav>
  );
}
