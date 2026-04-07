import { ReactNode } from "react";

interface IMacFrameProps {
    children: ReactNode;
    accentColor?: string;
}

export default function IMacFrame({ children, accentColor }: IMacFrameProps) {
    return (
        <div className="relative flex-shrink-0 w-full" style={{ aspectRatio: "12 / 10" }}>
            <div
                className="absolute inset-2 rounded-[36px]"
                style={{
                    background: "linear-gradient(180deg, #121212 0%, #0b0b0b 100%)",
                    boxShadow: accentColor
                        ? `0 24px 70px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)`
                        : "0 24px 70px rgba(0,0,0,0.35)",
                }}
            />
            <div
                className="absolute inset-[14px] rounded-[28px] overflow-hidden bg-[#050505]"
                style={{ border: "0.5px solid rgba(255,255,255,0.05)" }}
            >
                <div className="absolute left-1/2 top-4 h-2.5 w-20 -translate-x-1/2 rounded-full bg-white/10" />
                <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-white/15" />
                <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-white/15" />
                <div className="absolute inset-0">{children}</div>
            </div>
            <div
                className="absolute bottom-[-14px] left-1/2 h-[22px] w-[160px] -translate-x-1/2 rounded-[999px]"
                style={{ background: "rgba(0,0,0,0.25)" }}
            />
        </div>
    );
}
