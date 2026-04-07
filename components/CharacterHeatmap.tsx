"use client";

import { useEffect, useRef, useCallback } from "react";
import { emitMouseState, colorFromViewportX } from "@/lib/mouseColorStore";

interface Point {
  x: number;
  y: number;
}

interface GridCell {
  x: number;
  y: number;
  char: string;
}

const CHAR_SIZE = 11;
const CHAR = "0";
const RADIUS = 200;
const LERP_SPEED = 0.25;

// Deep orange → yellow → cyan heatmap
function heatColor(t: number): { r: number; g: number; b: number; a: number } {
  // t: 0 = outer edge (cyan), 1 = hot center (orange)
  if (t < 0.5) {
    const s = t / 0.5;
    return {
      r: Math.round(0 + 255 * s),
      g: Math.round(229 + (214 - 229) * s),
      b: Math.round(255 + (0 - 255) * s),
      a: 0.15 + t * 0.75,
    };
  } else {
    const s = (t - 0.5) / 0.5;
    return {
      r: 255,
      g: Math.round(214 + (92 - 214) * s),
      b: 0,
      a: 0.15 + t * 0.75,
    };
  }
}

// Burst color gradient: cyan → green → yellow → orange (outside to center)
function burstColor(angle: number, t: number): { r: number; g: number; b: number; a: number } {
  // t: 0 = outer edge, 1 = center
  // Map angle to hue: cyan (180°) → green (120°) → yellow (60°) → orange (30°)
  const normalizedAngle = ((angle / (Math.PI * 2)) * 360 + 360) % 360;

  // Blend hue based on distance from center (t parameter)
  let hue: number;
  if (t < 0.33) {
    // Outer: cyan to green
    const s = t / 0.33;
    hue = 180 - s * 60; // cyan (180) to green (120)
  } else if (t < 0.66) {
    // Middle: green to yellow
    const s = (t - 0.33) / 0.33;
    hue = 120 - s * 60; // green (120) to yellow (60)
  } else {
    // Inner: yellow to orange
    const s = (t - 0.66) / 0.34;
    hue = 60 - s * 30; // yellow (60) to orange (30)
  }

  // Convert HSL to RGB
  const c = (1 - Math.abs(2 * 0.7 - 1)) * 1;
  const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
  const m = 0.7 - c / 2;

  let r = 0, g = 0, b = 0;

  if (hue < 60) {
    r = c; g = x; b = 0;
  } else if (hue < 120) {
    r = x; g = c; b = 0;
  } else if (hue < 180) {
    r = 0; g = c; b = x;
  } else if (hue < 240) {
    r = 0; g = x; b = c;
  } else if (hue < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a: 0.08 + t * 0.12,
  };
}

interface CharacterHeatmapProps {
  triggerBurst?: boolean;
}

export default function CharacterHeatmap({ triggerBurst = false }: CharacterHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<GridCell[]>([]);
  const targetRef = useRef<Point>({ x: -999, y: -999 });
  const currentRef = useRef<Point>({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);
  const startupRef = useRef({
    active: true,
    startTime: 0,
    duration: 1400,
    completed: false,
  });

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cols = Math.ceil(canvas.width / CHAR_SIZE);
    const rows = Math.ceil(canvas.height / CHAR_SIZE);
    const cells: GridCell[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.push({
          x: c * CHAR_SIZE + CHAR_SIZE / 2,
          y: r * CHAR_SIZE + CHAR_SIZE / 2,
          char: CHAR,
        });
      }
    }
    gridRef.current = cells;
  }, []);

  const drawRef = useRef<() => void>(() => { });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const now = performance.now();
    const startup = startupRef.current;
    const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };

    if (!startup.completed) {
      const progress = Math.min((now - startup.startTime) / startup.duration, 1);
      const maxRadius = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
      const activeRadius = progress * maxRadius;
      currentRef.current.x = centerPoint.x;
      currentRef.current.y = centerPoint.y;
      activeRef.current = true;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${CHAR_SIZE - 2}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const grid = gridRef.current;
      for (let i = 0; i < grid.length; i++) {
        const cell = grid[i];
        const dx = cell.x - centerPoint.x;
        const dy = cell.y - centerPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < activeRadius) {
          const t = 1 - dist / activeRadius;
          const angle = Math.atan2(dy, dx);
          const { r, g, b, a } = burstColor(angle, t);
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.02)";
        }

        ctx.fillText(cell.char, cell.x, cell.y);
      }

      if (progress >= 1) {
        startup.completed = true;
        activeRef.current = false;
      }

      rafRef.current = requestAnimationFrame(drawRef.current!);
      return;
    }

    // Lerp toward target once startup animation has completed
    const cur = currentRef.current;
    const tgt = targetRef.current;
    cur.x += (tgt.x - cur.x) * LERP_SPEED;
    cur.y += (tgt.y - cur.y) * LERP_SPEED;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${CHAR_SIZE - 2}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const grid = gridRef.current;
    for (let i = 0; i < grid.length; i++) {
      const cell = grid[i];
      const dx = cell.x - cur.x;
      const dy = cell.y - cur.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < RADIUS && activeRef.current) {
        const t = 1 - dist / RADIUS;
        const falloff = t * t; // quadratic falloff
        const { r, g, b, a } = heatColor(falloff);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(a * 1.5, 1)})`;
      } else {
        ctx.fillStyle = "rgba(255,255,255,0.04)";
      }

      ctx.fillText(cell.char, cell.x, cell.y);
    }

    rafRef.current = requestAnimationFrame(drawRef.current!);
  }, []);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    if (triggerBurst) {
      startupRef.current.startTime = performance.now();
      startupRef.current.completed = false;
      startupRef.current.active = true;
    }
  }, [triggerBurst]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      buildGrid();
    };

    resize();
    startupRef.current.startTime = performance.now();
    startupRef.current.completed = false;
    startupRef.current.active = true;

    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      activeRef.current = true;
      // Emit normalized position + color based on x across viewport
      const xFrac = e.clientX / window.innerWidth;
      const yFrac = e.clientY / window.innerHeight;
      emitMouseState(xFrac, yFrac, colorFromViewportX(xFrac));
    };

    const onMouseLeave = () => {
      activeRef.current = false;
    };

    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      targetRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      activeRef.current = true;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouch, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, [buildGrid, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
