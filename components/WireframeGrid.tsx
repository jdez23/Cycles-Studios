"use client";

export default function WireframeGrid() {
  const vp = { w: 1200, h: 700 };
  const cols = 24;
  const rows = 18;
  const centerX = vp.w / 2;
  const centerY = vp.h / 2;

  const horizontalLines: { y: number }[] = [];
  for (let i = 0; i <= rows; i++) {
    horizontalLines.push({ y: (vp.h / rows) * i });
  }

  const verticalLines: { x: number }[] = [];
  for (let i = 0; i <= cols; i++) {
    verticalLines.push({ x: (vp.w / cols) * i });
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        viewBox={`0 0 ${vp.w} ${vp.h}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {horizontalLines.map((line, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={line.y}
            x2={vp.w}
            y2={line.y}
            stroke="white"
            strokeOpacity={0.03 + (i === 0 || i === rows ? 0.02 : 0)}
            strokeWidth="0.6"
          />
        ))}
        {verticalLines.map((line, i) => (
          <line
            key={`v-${i}`}
            x1={line.x}
            y1={0}
            x2={line.x}
            y2={vp.h}
            stroke="white"
            strokeOpacity={0.03 + (i === 0 || i === cols ? 0.02 : 0)}
            strokeWidth="0.6"
          />
        ))}
        <line
          x1={centerX}
          y1={0}
          x2={centerX}
          y2={vp.h}
          stroke="white"
          strokeOpacity="0.06"
          strokeWidth="0.8"
        />
        <line
          x1={0}
          y1={centerY}
          x2={vp.w}
          y2={centerY}
          stroke="white"
          strokeOpacity="0.06"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}
