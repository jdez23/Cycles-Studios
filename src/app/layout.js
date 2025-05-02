// src/app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = { title: "Cycles Studios" };
export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        <Navbar />
        {/* Use margin-top instead of padding so main still can fill the screen */}
        <div className="mt-16 h-[calc(100%-4rem)]">
          {children}
        </div>
      </body>
    </html>
  );
}
