"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { getLastMouseState, rgbToString, colorFromViewportX } from "@/lib/mouseColorStore";

interface Drip {
  x: number;
  color: string;
  blobRadius: number;
  maxLength: number;
  speed: number;      // progress units per frame
  progress: number;   // 0 → 1
  startDelay: number; // ms before this drip starts
  started: boolean;
}

function makeDrips(canvasWidth: number, mouseX: number, primaryColor: string): Drip[] {
  // Spread 5 drips — primary at mouse x, others at offsets with palette colors
  const configs = [
    { xFrac: mouseX,              color: primaryColor,                              delay: 0   },
    { xFrac: mouseX - 0.18,       color: rgbToString(colorFromViewportX(mouseX - 0.18)), delay: 180 },
    { xFrac: mouseX + 0.14,       color: rgbToString(colorFromViewportX(mouseX + 0.14)), delay: 90  },
    { xFrac: mouseX - 0.32,       color: rgbToString(colorFromViewportX(mouseX - 0.32)), delay: 300 },
    { xFrac: mouseX + 0.28,       color: rgbToString(colorFromViewportX(mouseX + 0.28)), delay: 220 },
  ];

  return configs.map((cfg) => ({
    x: Math.max(14, Math.min(canvasWidth - 14, cfg.xFrac * canvasWidth)),
    color: cfg.color,
    blobRadius: 7 + Math.random() * 6,
    maxLength: 60 + Math.random() * 80,
    speed: 0.006 + Math.random() * 0.005,
    progress: 0,
    startDelay: cfg.delay,
    started: false,
  }));
}

function drawDrip(
  ctx: CanvasRenderingContext2D,
  drip: Drip,
  progress: number
) {
  const eased = 1 - Math.pow(1 - Math.min(progress, 1), 2.5); // ease-out
  const len = drip.maxLength * eased;
  const r = drip.blobRadius;

  ctx.fillStyle = drip.color;
  ctx.globalAlpha = 0.9;

  // Blob (circle at very top of canvas)
  ctx.beginPath();
  ctx.arc(drip.x, r, r, 0, Math.PI * 2);
  ctx.fill();

  if (len > 1) {
    const tw = r * 0.62; // tail width
    // Teardrop tail — narrows to a rounded tip
    ctx.beginPath();
    ctx.moveTo(drip.x - tw, r * 1.2);
    ctx.lineTo(drip.x - tw * 0.2, r + len);
    ctx.quadraticCurveTo(
      drip.x,
      r + len + tw * 0.7,
      drip.x + tw * 0.2,
      r + len
    );
    ctx.lineTo(drip.x + tw, r * 1.2);
    ctx.fill();
  }
}

export default function PaintDrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startedRef = useRef(false);
  const isInView = useInView(containerRef, { once: true, margin: "-40px 0px" });

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const { x: mouseX, color } = getLastMouseState();
    const primaryColor = rgbToString(color);
    const drips = makeDrips(canvas.width, mouseX, primaryColor);

    const startTime = performance.now();

    const animate = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let anyActive = false;
      for (const drip of drips) {
        const elapsed = now - startTime;

        if (!drip.started) {
          if (elapsed < drip.startDelay) {
            anyActive = true;
            continue;
          }
          drip.started = true;
        }

        if (drip.progress < 1) {
          drip.progress = Math.min(drip.progress + drip.speed, 1);
          anyActive = true;
        }

        drawDrip(ctx, drip, drip.progress);
      }

      ctx.globalAlpha = 1;

      if (anyActive) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Final static render — keep drips painted
        for (const drip of drips) drawDrip(ctx, drip, 1);
        ctx.globalAlpha = 1;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full pointer-events-none z-10"
      style={{ height: 160 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
