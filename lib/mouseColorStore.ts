export type RGB = { r: number; g: number; b: number };

interface MouseState {
  x: number; // 0-1, normalized viewport x
  y: number; // 0-1, normalized viewport y
  color: RGB;
}

let state: MouseState = {
  x: 0.5,
  y: 0.5,
  color: { r: 255, g: 214, b: 0 },
};

type Listener = (s: MouseState) => void;
const listeners = new Set<Listener>();

export function emitMouseState(x: number, y: number, color: RGB): void {
  state = { x, y, color };
  listeners.forEach((l) => l(state));
}

export function getLastMouseState(): MouseState {
  return { ...state };
}

export function subscribeMouseState(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// Maps viewport x (0-1) to heatmap color: left=cyan, center=yellow, right=orange
export function colorFromViewportX(xFrac: number): RGB {
  const t = Math.max(0, Math.min(1, xFrac));
  if (t < 0.5) {
    const s = t / 0.5;
    return {
      r: Math.round(255 * s),
      g: Math.round(229 - 15 * s),
      b: Math.round(255 - 255 * s),
    };
  } else {
    const s = (t - 0.5) / 0.5;
    return {
      r: 255,
      g: Math.round(214 - 122 * s),
      b: 0,
    };
  }
}

export function rgbToString(c: RGB): string {
  return `rgb(${c.r},${c.g},${c.b})`;
}
