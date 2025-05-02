"use client";
import { useState, useEffect, useRef } from "react";

export default function Carousel({ slides = [] }) {
    const [idx, setIdx] = useState(0);
    const count = slides.length;
    const containerRef = useRef(null);

    const prev = () => setIdx(i => (i - 1 + count) % count);
    const next = () => setIdx(i => (i + 1) % count);

    // Auto-scroll (only for homeSlides)
    useEffect(() => {
        const currentSlide = slides[idx];
        const isVideoPlaying =
            currentSlide?.videoSrc && containerRef.current?.querySelector("video")?.currentTime > 0;

        if (currentSlide?.videoSrc || isVideoPlaying) return;

        const timer = setInterval(() => {
            setIdx(i => (i + 1) % count);
        }, 6000);

        return () => clearInterval(timer);
    }, [idx, slides]);

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    display: "flex",
                    width: `${count * 100}vw`,
                    transform: `translateX(-${idx * 100}vw)`,
                    transition: "transform 0.5s ease",
                    height: "100%",
                }}
            >
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        style={{
                            flex: "0 0 100vw",
                            height: "100vh",
                            backgroundImage: `url(${slide.gradient})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxSizing: "border-box",
                            padding: "2rem",
                        }}
                    >
                        {/* VIDEO SLIDE */}
                        {slide.videoSrc ? (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "2rem",
                                    backgroundColor: "#141414",
                                    borderRadius: "32px",
                                    padding: "2rem",
                                    width: "100%",
                                    maxWidth: "960px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <video
                                    src={slide.videoSrc}
                                    controls
                                    style={{
                                        flex: "1 1 300px",            // allows it to scale with container
                                        maxWidth: "100%",             // keeps it from overflowing
                                        borderRadius: "16px",         // rounded corners
                                        objectFit: "cover",           // maintains aspect ratio
                                        // 🎯 <––– YOU CAN EDIT THESE PROPERTIES
                                        width: "15vw",                // ← adjust this (e.g. "40vw", "300px", "60%")
                                        maxHeight: "50vh",            // ← adjust this (e.g. "50vh", "500px")
                                    }}
                                />
                                <div
                                    style={{
                                        flex: "1 1 300px",
                                        color: "white",
                                        textAlign: "left",
                                        fontSize: "1rem",
                                        lineHeight: 1.6,
                                        overflowY: "auto",
                                        maxHeight: "60vh",
                                        whiteSpace: "pre-line",
                                    }}
                                >
                                    {slide.videoText &&
                                        slide.videoText.split(/\n+/).map((p, pi) => (
                                            <p key={pi} style={{ marginBottom: "1rem" }}>
                                                {p}
                                            </p>
                                        ))}

                                    {slide.instagramUrl && (
                                        <a
                                            href={slide.instagramUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ marginTop: "1rem", display: "inline-block" }}
                                        >
                                            <img
                                                src="logo/instagram.png"
                                                alt="Instagram"
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ) : slide.imgSrc ? (
                            // IMAGE + TEXT SLIDE
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                    gap: "2rem",
                                    maxWidth: "960px",
                                    width: "100%",
                                }}
                            >
                                <img
                                    src={slide.imgSrc}
                                    alt=""
                                    style={{
                                        width: "40vw",
                                        maxWidth: "300px",
                                        borderRadius: "28px",
                                        objectFit: "cover",
                                    }}
                                />
                                <div
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        fontSize: "1.4rem",
                                        lineHeight: 1.4,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {slide.lines?.map((line, li) => (
                                        <p
                                            key={li}
                                            style={{
                                                margin: 0,
                                                marginBottom: "0.6rem",
                                                fontSize: li === 0 ? "3rem" : "1.4rem",
                                            }}
                                        >
                                            {line}
                                        </p>
                                    ))}

                                    <a
                                        href="https://apps.apple.com/us/app/cycles-discover-playlists/id6446672039"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ marginTop: "1rem" }}
                                    >
                                        <img
                                            src="logo/applelogo.png"
                                            alt="App Store"
                                            style={{ width: "100px", height: "auto" }}
                                        />
                                    </a>
                                </div>
                            </div>
                        ) : (
                            // TITLE SLIDE
                            <div style={{ textAlign: "center", maxWidth: "90%" }}>
                                <h1
                                    style={{
                                        fontSize: "5rem",
                                        margin: 0,
                                        color: "white",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {slide.title}
                                </h1>
                                <p
                                    style={{
                                        fontSize: "1.2rem",
                                        marginTop: "0.5rem",
                                        color: "white",
                                    }}
                                >
                                    {slide.subtitle}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* CHEVRONS */}
            <button
                onClick={prev}
                style={{
                    position: "absolute",
                    left: 20,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                <img src="logo/leftarrow.png" alt="Prev" style={{ width: 28, height: 28 }} />
            </button>
            <button
                onClick={next}
                style={{
                    position: "absolute",
                    right: 20,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                <img src="logo/rightarrow.png" alt="Next" style={{ width: 28, height: 28 }} />
            </button>

            {/* DOT INDICATOR */}
            <div
                style={{
                    position: "absolute",
                    bottom: 24,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "0.5rem",
                    zIndex: 20,
                }}
            >
                {slides.map((_, i) => (
                    <span
                        key={i}
                        onClick={() => setIdx(i)}
                        style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background: i === idx ? "white" : "rgba(255,255,255,0.4)",
                            cursor: "pointer",
                            transition: "background 0.3s",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
