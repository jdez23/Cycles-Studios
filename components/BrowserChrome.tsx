import { ReactNode } from "react";

interface BrowserChromeProps {
  url: string;
  children: ReactNode;
}

export default function BrowserChrome({ url, children }: BrowserChromeProps) {
  return (
    <div className="absolute inset-0 flex flex-col">
      {/* Browser toolbar */}
      <div className="flex-shrink-0 flex items-center gap-2.5 px-3 h-8 bg-[#181818] border-b border-white/[0.06]">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>
        {/* Address bar */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-1.5 bg-[#252525] rounded-[5px] px-3 h-[18px] min-w-0 max-w-[200px] w-full">
            {/* Lock icon */}
            <svg width="7" height="8" viewBox="0 0 7 8" fill="none" className="flex-shrink-0 opacity-40">
              <rect x="0.5" y="3.5" width="6" height="4" rx="0.75" stroke="white" strokeWidth="0.75" />
              <path d="M1.75 3.5V2.25a1.75 1.75 0 013.5 0V3.5" stroke="white" strokeWidth="0.75" />
            </svg>
            <span className="text-[8px] text-white/40 tracking-wide truncate leading-none">{url}</span>
          </div>
        </div>
        {/* Spacer to balance traffic lights */}
        <div className="w-[38px]" />
      </div>
      {/* Page content */}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
