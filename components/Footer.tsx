export default function Footer() {
  return (
    <footer className="w-full px-8 md:px-16 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
      <span className="text-xs text-white/20 tracking-[0.15em]">
        © 2026 Cycles Studios
      </span>

      <div className="flex items-center gap-6">
        {[
          { label: "Instagram", href: "#" },
          { label: "LinkedIn", href: "#" },
          { label: "X", href: "#" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs tracking-[0.15em] uppercase text-white/20 hover:text-white/60 transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
