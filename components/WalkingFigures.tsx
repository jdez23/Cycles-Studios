"use client";

import { useEffect, useRef } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────
// 7.5-head figure: FIG_H = 90 local units, head diameter ≈ 12 units
const FIG_H = 90;
const SCAN_STEP = 1.3;   // vertical gap between scan lines (local units)
const BASE_DASH = 5.0;   // nominal dash length
const BASE_GAP = 1.4;    // nominal gap between dashes

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

// ─── Capsule intersection ────────────────────────────────────────────────────
// Returns [xLeft, xRight] of a thick line segment (ax,ay)→(bx,by) with half-width r
// at the given horizontal scan line y. Returns null if the scan misses the capsule.
function capsule(
  y: number,
  ax: number, ay: number,
  bx: number, by: number,
  r: number
): [number, number] | null {
  const lo = Math.min(ay, by) - r;
  const hi = Math.max(ay, by) + r;
  if (y < lo || y > hi) return null;
  const dy = by - ay;
  const t = Math.abs(dy) < 0.001 ? 0.5 : Math.max(0, Math.min(1, (y - ay) / dy));
  const midX = ax + t * (bx - ax);
  return [midX - r, midX + r];
}

// ─── Joint calculation ────────────────────────────────────────────────────────
// Local coordinate system (figure faces +x = right):
//   x > 0  →  front of body (chest, toes)
//   x < 0  →  back of body (spine, heels)
//   y = 0  →  top of head
//   y = FIG_H  →  ground / feet
function getJoints(phase: number) {
  const θ = phase * Math.PI * 2;

  // Primary stride oscillator (near leg forward when > 0)
  const stride = Math.sin(θ);
  // Vertical hip bob (twice per full stride cycle)
  const hipBob = Math.cos(θ * 2) * 0.9;

  // ── Pelvis ───────────────────────────────────────────────────────────
  const pelvisX = stride * 0.35;
  const pelvisY = 52 + hipBob;

  // ── Arms (swing opposite to ipsilateral leg) ─────────────────────────
  const shoulderY = 18.5;
  const shoulderFront = 1.2; // slight forward set of shoulder attachment
  const uArmL = 13.5;
  const foreArmL = 12.0;

  // Near arm: opposite phase from near leg
  const nearArmAngle = -stride * 0.40;
  const nearElbowFlex = 0.16 + Math.abs(nearArmAngle) * 0.45;
  const nearElbowX = shoulderFront + uArmL * Math.sin(nearArmAngle);
  const nearElbowY = shoulderY + uArmL * Math.cos(nearArmAngle);
  const nearWristX = nearElbowX + foreArmL * Math.sin(nearArmAngle + nearElbowFlex);
  const nearWristY = nearElbowY + foreArmL * Math.cos(nearArmAngle + nearElbowFlex);

  // Far arm: same phase as near leg (and slightly further back, partially occluded)
  const farArmAngle = stride * 0.34;
  const farElbowFlex = 0.10 + Math.abs(farArmAngle) * 0.35;
  const farElbowX = (shoulderFront - 0.6) + uArmL * Math.sin(farArmAngle);
  const farElbowY = shoulderY + uArmL * Math.cos(farArmAngle);
  const farWristX = farElbowX + foreArmL * Math.sin(farArmAngle + farElbowFlex);
  const farWristY = farElbowY + foreArmL * Math.cos(farArmAngle + farElbowFlex);

  // ── Legs ─────────────────────────────────────────────────────────────
  const thighL = 20.5;
  const shinL = 19.0;

  // Near leg (right): forward when stride > 0
  const nThigh = stride * 0.46;          // thigh angle from vertical (rad)
  const nKneeBend = 0.07 + Math.abs(stride) * 0.16;
  const nKneeX = pelvisX + thighL * Math.sin(nThigh);
  const nKneeY = pelvisY + thighL * Math.cos(nThigh);
  const nShin = nThigh - nKneeBend;
  const nAnkleX = nKneeX + shinL * Math.sin(nShin);
  const nAnkleY = nKneeY + shinL * Math.cos(nShin);
  // Foot: dorsiflexion (toe lifts on forward swing, pushes on back swing)
  const nDorsi = stride * 0.30;
  const nHeelX = nAnkleX - 2.8 * Math.cos(nDorsi);
  const nHeelY = nAnkleY + 2.8 * Math.sin(nDorsi) + 1.2;
  const nToeX  = nAnkleX + 7.5 * Math.cos(nDorsi);
  const nToeY  = nAnkleY - 7.5 * Math.sin(nDorsi) + 1.8;

  // Far leg (left): exact opposite stride phase
  const fThigh = -stride * 0.46;
  const fKneeBend = 0.07 + Math.abs(stride) * 0.16;
  const fKneeX = pelvisX + thighL * Math.sin(fThigh);
  const fKneeY = pelvisY + thighL * Math.cos(fThigh);
  const fShin = fThigh - fKneeBend;
  const fAnkleX = fKneeX + shinL * Math.sin(fShin);
  const fAnkleY = fKneeY + shinL * Math.cos(fShin);
  const fDorsi = -stride * 0.30;
  const fHeelX = fAnkleX - 2.8 * Math.cos(fDorsi);
  const fHeelY = fAnkleY + 2.8 * Math.sin(fDorsi) + 1.2;
  const fToeX  = fAnkleX + 7.5 * Math.cos(fDorsi);
  const fToeY  = fAnkleY - 7.5 * Math.sin(fDorsi) + 1.8;

  return {
    pelvisX, pelvisY,
    shoulderFront, shoulderY,
    nearArm: { sx: shoulderFront, sy: shoulderY, ex: nearElbowX, ey: nearElbowY, wx: nearWristX, wy: nearWristY },
    farArm:  { sx: shoulderFront - 0.6, sy: shoulderY, ex: farElbowX, ey: farElbowY, wx: farWristX, wy: farWristY },
    nearLeg: { hx: pelvisX, hy: pelvisY, kx: nKneeX, ky: nKneeY, ax: nAnkleX, ay: nAnkleY, heelX: nHeelX, heelY: nHeelY, toeX: nToeX, toeY: nToeY },
    farLeg:  { hx: pelvisX, hy: pelvisY, kx: fKneeX, ky: fKneeY, ax: fAnkleX, ay: fAnkleY, heelX: fHeelX, heelY: fHeelY, toeX: fToeX, toeY: fToeY },
  };
}

// ─── Build all body intervals at a given scan y ───────────────────────────────
function getBodyIntervals(y: number, phase: number): [number, number][] {
  const segs: [number, number][] = [];
  const j = getJoints(phase);

  // ── Head: side-profile oval (asymmetric front/back) ───────────────────
  // Cranium height ≈ 12 units; face protrudes further forward than cranium is deep
  {
    const headCy = 5.8;
    const headRy = 6.0;   // vertical semi-axis
    const headFront = 4.5; // x extent forward (face/nose)
    const headBack  = 3.0; // x extent backward (cranium)
    const dy = y - headCy;
    if (Math.abs(dy) < headRy) {
      const hw = Math.sqrt(Math.max(0, 1 - (dy * dy) / (headRy * headRy)));
      segs.push([1.4 - headBack * hw, 1.4 + headFront * hw]);
    }
  }

  // ── Neck ──────────────────────────────────────────────────────────────
  {
    const s = capsule(y, 1.2, 12, 0.6, 17, 2.0);
    if (s) segs.push(s);
  }

  // ── Torso: side-profile silhouette (shoulder → hip, y 16–56) ──────────
  // Front profile: chest swells out then narrows at waist, slight abdominal curve
  // Back profile: upper back flat, lumbar curve in, buttocks protrude behind
  if (y > 16 && y < 56) {
    const t = (y - 16) / 40; // 0 = top of chest, 1 = base of pelvis
    const front =
      t < 0.22 ? lerp(4.8, 6.6, t / 0.22)                  // pectoral expansion
      : t < 0.50 ? lerp(6.6, 3.0, (t - 0.22) / 0.28)       // waist narrowing
      : t < 0.72 ? lerp(3.0, 3.8, (t - 0.50) / 0.22)       // lower abdomen slight swell
      :             lerp(3.8, 2.2, (t - 0.72) / 0.28);      // taper to groin
    const back =
      t < 0.14 ? -4.4                                        // shoulder blade plane
      : t < 0.38 ? lerp(-4.4, -3.0, (t - 0.14) / 0.24)     // mid-back inward
      : t < 0.60 ? lerp(-3.0, -5.8, (t - 0.38) / 0.22)     // gluteal mass
      :             lerp(-5.8, -4.2, (t - 0.60) / 0.40);   // lower gluteal taper
    segs.push([back, front]);
  }

  // ── Near arm (foreground) ─────────────────────────────────────────────
  {
    const a = j.nearArm;
    const ua = capsule(y, a.sx, a.sy, a.ex, a.ey, 2.3);
    if (ua) segs.push(ua);
    const fa = capsule(y, a.ex, a.ey, a.wx, a.wy, 1.9);
    if (fa) segs.push(fa);
  }

  // ── Far arm (background, slightly reduced radius) ─────────────────────
  {
    const a = j.farArm;
    const ua = capsule(y, a.sx, a.sy, a.ex, a.ey, 1.9);
    if (ua) segs.push(ua);
    const fa = capsule(y, a.ex, a.ey, a.wx, a.wy, 1.5);
    if (fa) segs.push(fa);
  }

  // ── Near leg (foreground) ─────────────────────────────────────────────
  {
    const l = j.nearLeg;
    const th = capsule(y, l.hx, l.hy, l.kx, l.ky, 3.3);   // thigh
    if (th) segs.push(th);
    const sh = capsule(y, l.kx, l.ky, l.ax, l.ay, 2.5);    // shin
    if (sh) segs.push(sh);
    const ft = capsule(y, l.heelX, l.heelY, l.toeX, l.toeY, 2.0); // foot
    if (ft) segs.push(ft);
  }

  // ── Far leg (background, slightly reduced radius) ─────────────────────
  {
    const l = j.farLeg;
    const th = capsule(y, l.hx, l.hy, l.kx, l.ky, 2.7);
    if (th) segs.push(th);
    const sh = capsule(y, l.kx, l.ky, l.ax, l.ay, 2.1);
    if (sh) segs.push(sh);
    const ft = capsule(y, l.heelX, l.heelY, l.toeX, l.toeY, 1.6);
    if (ft) segs.push(ft);
  }

  return segs;
}

// ─── RNG ─────────────────────────────────────────────────────────────────────
function makeFastRng(seed: number) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// ─── Draw one figure ─────────────────────────────────────────────────────────
function drawFigure(
  ctx: CanvasRenderingContext2D,
  cx: number,
  bottomY: number,
  walkPhase: number,
  scale: number,
  alpha: number,
  noiseAmp: number,
  time: number,
  rng: () => number,
  facing: number  // 1 = facing right, -1 = facing left
) {
  if (alpha <= 0.01) return;

  const topY = bottomY - FIG_H * scale;

  for (let fy = 0; fy <= FIG_H; fy += SCAN_STEP) {
    if (rng() < 0.055) continue; // stochastic scan dropout

    // Lateral signal drift (simulates scan-frame jitter)
    const drift = Math.sin(time * 5.1 + fy * 0.87) * noiseAmp * 0.32;
    const jitter = rng() < 0.028 ? (rng() - 0.5) * noiseAmp * 2.8 : 0;

    // Per-row luminosity flicker
    const rowAlpha = alpha * (0.66 + Math.sin(time * 2.9 + fy * 1.2) * 0.24);
    const canvasY = topY + fy * scale;

    const intervals = getBodyIntervals(fy, walkPhase);

    for (const [lx1, lx2] of intervals) {
      // Apply facing direction — flip silhouette for left-walking figures
      const fx1 = facing * lx1;
      const fx2 = facing * lx2;
      const [wx1, wx2] = fx1 < fx2
        ? [cx + (fx1 + drift + jitter) * scale, cx + (fx2 + drift + jitter) * scale]
        : [cx + (fx2 + drift + jitter) * scale, cx + (fx1 + drift + jitter) * scale];

      if (wx2 - wx1 < 0.8) continue;

      // Render as horizontal dash fragments (scan-line energy)
      let x = wx1;
      while (x < wx2) {
        const dashLen = (BASE_DASH + rng() * 1.8) * scale;
        const gap     = (BASE_GAP  + rng() * 1.2) * scale;
        const end     = Math.min(x + dashLen, wx2);
        ctx.globalAlpha = rowAlpha * (0.58 + rng() * 0.42);
        ctx.fillStyle = "rgb(228,228,228)";
        ctx.fillRect(x, canvasY, end - x, 1.05 * scale);
        x += dashLen + gap;
      }
    }
  }

  ctx.globalAlpha = 1;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function WalkingFigures() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Figure roster ──────────────────────────────────────────────────
    // direction: 1 = left→right, -1 = right→left
    // facing:    1 = profile facing right, -1 = profile facing left
    const figures = [
      { direction:  1, facing:  1, speed: 1.00, scale: 1.00, opacity: 0.82, noise: 0.7, ghosts: 3, ghostSpacing: 14, ghostFade: 0.022, phaseOffset: 0.00 },
      { direction: -1, facing: -1, speed: 0.72, scale: 0.86, opacity: 0.60, noise: 1.1, ghosts: 4, ghostSpacing: 17, ghostFade: 0.016, phaseOffset: 0.30 },
      { direction:  1, facing:  1, speed: 1.28, scale: 0.76, opacity: 0.50, noise: 1.4, ghosts: 2, ghostSpacing: 11, ghostFade: 0.026, phaseOffset: 0.58 },
      { direction: -1, facing: -1, speed: 0.92, scale: 1.08, opacity: 0.70, noise: 0.5, ghosts: 3, ghostSpacing: 15, ghostFade: 0.019, phaseOffset: 0.78 },
    ];

    const TRAVERSE_MS  = 44000; // ms to cross the full canvas width
    const CYCLE_MS     = 820;   // ms per full walk cycle
    const BASE_FIG_PX  = 82;    // base figure height in CSS pixels

    const start = performance.now();

    const animate = (now: number) => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) { rafRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, w, h);
      const elapsed = now - start;
      const time    = elapsed / 1000;

      figures.forEach((fig, figIdx) => {
        const traverseMs = TRAVERSE_MS / fig.speed;
        const progress   = ((elapsed * fig.speed) % traverseMs) / traverseMs;
        const walkPhase  = ((elapsed % CYCLE_MS) / CYCLE_MS + fig.phaseOffset) % 1;

        const margin = 120 * dpr;
        const figX   = fig.direction === 1
          ? -margin + progress * (w + margin * 2)
          : w + margin - progress * (w + margin * 2);

        const bottomY  = h - 10 * dpr;
        const figScale = (BASE_FIG_PX * fig.scale / FIG_H) * dpr;

        // Ghost trails (motion echo)
        for (let g = fig.ghosts; g >= 1; g--) {
          const ghostX = figX - g * fig.ghostSpacing * dpr * fig.direction;
          if (ghostX < -margin * 2 || ghostX > w + margin * 2) continue;
          const gPhase = ((elapsed - g * 90) % CYCLE_MS) / CYCLE_MS + fig.phaseOffset;
          const gAlpha = fig.opacity * fig.ghostFade * (fig.ghosts - g + 1) * 1.8;
          const gNoise = fig.noise + g * 0.7;
          const rng    = makeFastRng(Math.floor(time * 60) + figIdx * 100 + g * 31);
          drawFigure(ctx, ghostX, bottomY, (gPhase + 1) % 1, figScale, gAlpha, gNoise, time, rng, fig.facing);
        }

        // Main figure
        const rng = makeFastRng(Math.floor(time * 60) + figIdx * 100);
        drawFigure(ctx, figX, bottomY, walkPhase, figScale, fig.opacity, fig.noise, time, rng, fig.facing);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: 130 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
