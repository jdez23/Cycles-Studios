import { ReactNode } from "react";

interface IPhoneFrameProps {
  children: ReactNode;
  accentColor?: string;
}

export default function IPhoneFrame({ children, accentColor }: IPhoneFrameProps) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: 260, aspectRatio: "9 / 19.5" }}
    >
      {/* Outer shell */}
      <div
        className="absolute inset-0 rounded-[44px]"
        style={{
          background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 60%, #111 100%)",
          boxShadow: accentColor
            ? `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07), 0 0 40px ${accentColor}18`
            : "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      />

      {/* Side buttons — left (volume) */}
      <div className="absolute left-[-2.5px] top-[90px] w-[2.5px] h-[30px] rounded-l-sm bg-[#2e2e2e]" />
      <div className="absolute left-[-2.5px] top-[130px] w-[2.5px] h-[30px] rounded-l-sm bg-[#2e2e2e]" />
      <div className="absolute left-[-2.5px] top-[175px] w-[2.5px] h-[32px] rounded-l-sm bg-[#2e2e2e]" />

      {/* Side button — right (power) */}
      <div className="absolute right-[-2.5px] top-[120px] w-[2.5px] h-[50px] rounded-r-sm bg-[#2e2e2e]" />

      {/* Screen bezel */}
      <div
        className="absolute rounded-[40px] overflow-hidden bg-black"
        style={{ inset: 3 }}
      >
        {/* Dynamic island */}
        <div
          className="absolute top-[10px] left-1/2 z-20 rounded-full bg-black"
          style={{
            width: 88,
            height: 26,
            transform: "translateX(-50%)",
          }}
        />

        {/* Screen content */}
        <div className="absolute inset-0">{children}</div>

        {/* Home indicator */}
        <div
          className="absolute bottom-[6px] left-1/2 z-20 rounded-full bg-white/40"
          style={{ width: 100, height: 4, transform: "translateX(-50%)" }}
        />
      </div>
    </div>
  );
}
