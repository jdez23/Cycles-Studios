import { ReactNode } from "react";

interface LaptopFrameProps {
    children: ReactNode;
    accentColor: string;
}

export default function LaptopFrame({ children, accentColor }: LaptopFrameProps) {
    return (
        <div className="relative w-full max-w-[520px] mx-auto rounded-[54px] bg-slate-950 shadow-[0_45px_120px_-45px_rgba(0,0,0,0.55)] overflow-hidden border border-white/10">
            <div
                className="absolute inset-x-0 top-0 h-6"
                style={{ background: `linear-gradient(180deg, ${accentColor}33, transparent)` }}
            />
            <div className="absolute inset-x-0 top-0 h-16 flex items-center justify-center gap-2">
                <span className="w-12 h-2 rounded-full bg-white/20" />
                <span className="w-6 h-2 rounded-full bg-white/15" />
            </div>
            <div className="relative pt-14 pb-8 px-6">
                <div className="relative w-full aspect-[16/10] rounded-[42px] overflow-hidden border border-white/10 bg-slate-900 shadow-inner">
                    {children}
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>
    );
}
