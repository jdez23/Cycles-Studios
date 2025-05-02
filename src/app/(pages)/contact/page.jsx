"use client";

export default function ContactPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                backgroundColor: "#000000", // full black
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem", // mobile-safe spacing
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    backgroundColor: "#0b0b0b", // slightly lighter black box
                    borderRadius: "1.5rem",
                    padding: "2rem",
                    maxWidth: "400px",
                    width: "100%",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                }}
            >
                <h1
                    style={{
                        fontFamily: "Inked, sans-serif",
                        fontSize: "2rem",
                        color: "white",
                        textAlign: "center",
                        marginBottom: "1.5rem",
                    }}
                >
                    Contact Us
                </h1>

                <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        style={{
                            height: "3rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "#1c1c1c",
                            padding: "0 1rem",
                            color: "white",
                            border: "none",
                        }}
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        style={{
                            height: "3rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "#1c1c1c",
                            padding: "0 1rem",
                            color: "white",
                            border: "none",
                        }}
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={5}
                        style={{
                            borderRadius: "0.5rem",
                            backgroundColor: "#1c1c1c",
                            padding: "1rem",
                            color: "white",
                            border: "none",
                            resize: "none",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            height: "3rem",
                            borderRadius: "9999px",
                            backgroundImage: "url('/gradient1.svg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            color: "white",
                            fontWeight: "bold",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
