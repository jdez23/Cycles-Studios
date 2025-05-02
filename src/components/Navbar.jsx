// src/components/Navbar.jsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ];

  return (
    <header style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      padding: "1.5rem 0",   // 24px top/bottom
      backdropFilter: "blur(8px)",
      zIndex: 50,
    }}>
      <nav className="w-screen flex justify-evenly items-center px-600">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            scroll={href === "/" ? false : undefined}
            className="text-white text-base md:text-lg text-center"
          >
            {label === "Home" ? (
              <Image
                src="/cycles-human.PNG"
                alt="Cycles Studios"
                width={50}
                height={36}
                className="block"
              />
            ) : (
              label
            )}
          </Link>
        ))}
      </nav>
    </header>
  );
}
