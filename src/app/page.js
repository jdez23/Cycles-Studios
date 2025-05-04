"use client";

import { useEffect, useRef, useState } from "react";
import Carousel from "@/components/Carousel";

export default function HomePage() {
  const sections = ["home", "product1"];
  const [current, setCurrent] = useState(0);
  const refs = useRef([]);

  // Track which vertical section is in view
  useEffect(() => {
    refs.current = refs.current.slice(0, sections.length);
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setCurrent(Number(e.target.dataset.idx));
        });
      },
      { threshold: 0.6 }
    );
    refs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const scrollTo = i =>
    refs.current[i]?.scrollIntoView({ behavior: "smooth" });

  // Home carousel slides
  const homeSlides = [
    { gradient: "gradient/gradient1.svg", title: "CYCLES STUDIOS", subtitle: "ART – CULTURE – TECHNOLOGY" },
    { gradient: "gradient/gradient2.svg", videoSrc: "video/websiteVid.mov", videoText: `In this spotlight interview, we asked rising artist Malachi from Modesto, CA, to explore the moment he realized his music had a voice of its own. He shares how writing for others—like Bay Area artists P-Lo and LaRussell—showed him the true emotional impact of his words. The conversation goes beyond music, touching on purpose, connection, and creative growth. This is just one way Cycles Studios documents and elevates emerging voices in the culture.` },
    { gradient: "gradient/gradient3.svg", videoSrc: "video/websiteVid2.mov", videoText: `In collaboration with beloved Bay Area toy store Five Little Monkeys, we hit the streets to give away a free Sonny Angel and ask a simple question: “What song reminds you of your childhood?” The responses are heartfelt, funny, and deeply nostalgic, capturing the emotional power of music across generations. This piece reflects Cycles Studios’ mission to blend community storytelling with cultural moments.`, instagramUrl: "https://instagram.com/cycles_studios" },
  ];

  // Product1 carousel slides
  const productSlides = [
    { gradient: "gradient/gradient2.svg", imgSrc: "product/cycles1.png", lines: ["cycles","every adventure","has a playlist","share the","playlist to your","adventure"] },
    { gradient: "gradient/gradient2.svg", imgSrc: "product/cycles2.png", lines: ["discover",
        "the perfect playlist",
        "for any mood or moment",
        "and save songs",
        "directly to your spotify"] },
    { gradient: "gradient/gradient2.svg", imgSrc: "product/cycles3.png", lines: ["find","new friends and","playlist curators","and keep up","with their playlists"] },
  ];

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      overflowY: "auto",
      scrollSnapType: "y mandatory",
    }}>
      {sections.map((id, idx) => (
        <div
          key={id}
          data-idx={idx}
          ref={el => (refs.current[idx] = el)}
          style={{ scrollSnapAlign: "start" }}
        >
          {idx === 0 && (
            <Carousel slides={homeSlides} showDots autoScroll />
          )}
          {idx === 1 && (
            <Carousel slides={productSlides} showDots={true} />
          )}
        </div>
      ))}

      {/* Vertical scroll arrows */}
      {current > 0 && (
        <button onClick={() => scrollTo(current - 1)} style={{
          position: "fixed",
          top: 80,
          right: "50%",
          transform: "translateX(50%)",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          zIndex: 1000,
        }}>
          <img src="logo/uparrow.png" alt="Scroll up" style={{ width: "32px", height: "32px" }} />
        </button>
      )}
      {current < sections.length - 1 && (
        <button onClick={() => scrollTo(current + 1)} style={{
          position: "fixed",
          bottom: 20,
          right: "50%",
          transform: "translateX(50%)",
          background: "transparent",
          border: "none",
          padding: 30,
          cursor: "pointer",
          zIndex: 1000,
        }}>
          <img src="logo/downarrow.png" alt="Scroll down" style={{ width: "32px", height: "32px" }} />
        </button>
      )}
    </div>
  );
}
