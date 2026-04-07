export default function ZahaBuilding() {
  return (
    <svg
      viewBox="0 0 420 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 right-0 h-[62%] w-auto pointer-events-none"
      style={{ opacity: 0.11 }}
      aria-hidden="true"
    >
      {/* Main outer shell — sweeping from ground, curves up and cantilevers left */}
      <path
        d="M 420 560 L 420 310 C 418 240 395 192 322 164 C 248 136 148 128 72 148 C 36 158 12 182 6 222 C 0 262 8 330 12 400 L 12 560 Z"
        stroke="white"
        strokeWidth="1.1"
        fill="none"
      />

      {/* Inner facade contour — second shell, slightly offset */}
      <path
        d="M 400 560 L 400 330 C 398 268 378 224 310 200 C 242 176 148 168 84 186 C 52 195 34 216 30 250 C 26 284 34 348 38 415 L 38 560"
        stroke="white"
        strokeWidth="0.7"
        fill="none"
      />

      {/* Horizontal floor band — upper */}
      <path
        d="M 8 285 C 70 272 170 264 295 260 C 352 258 392 260 420 262"
        stroke="white"
        strokeWidth="0.75"
        fill="none"
      />

      {/* Horizontal floor band — mid */}
      <path
        d="M 10 360 C 65 350 165 344 295 340 C 358 338 395 340 420 342"
        stroke="white"
        strokeWidth="0.75"
        fill="none"
      />

      {/* Horizontal floor band — lower */}
      <path
        d="M 11 435 C 72 427 175 422 305 419 C 364 417 398 418 420 420"
        stroke="white"
        strokeWidth="0.75"
        fill="none"
      />

      {/* Roof cantilever / terrace line */}
      <path
        d="M 38 210 C 100 195 200 186 318 182 C 370 181 403 183 420 186"
        stroke="white"
        strokeWidth="0.7"
        fill="none"
      />

      {/* Upper sweep — topmost architectural form */}
      <path
        d="M 72 162 C 130 148 220 138 340 138 C 382 138 408 141 420 144"
        stroke="white"
        strokeWidth="0.65"
        fill="none"
      />

      {/* Left vertical structural spine */}
      <path
        d="M 12 560 C 12 500 10 420 8 360 C 6 300 4 250 6 222"
        stroke="white"
        strokeWidth="0.65"
        fill="none"
      />

      {/* Diagonal facade panels — Hadid's signature faceting */}
      <path
        d="M 45 560 C 44 490 40 400 36 330 C 32 270 28 230 30 205"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M 90 560 C 90 490 88 398 86 328 C 84 268 82 225 84 198"
        stroke="white"
        strokeWidth="0.5"
        fill="none"
      />

      {/* Horizontal glazing band detail — between upper floors */}
      <path
        d="M 20 318 C 72 311 158 307 272 304 C 336 302 385 304 420 306"
        stroke="white"
        strokeWidth="0.45"
        strokeDasharray="4 3"
        fill="none"
      />

      {/* Ground plane / shadow base */}
      <path
        d="M 0 560 L 420 560"
        stroke="white"
        strokeWidth="0.6"
        fill="none"
      />
    </svg>
  );
}
