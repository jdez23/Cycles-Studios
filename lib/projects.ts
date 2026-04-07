import { Slide } from "@/components/Carousel";

export interface Project {
  slug: string;
  index: string;
  name: string;
  category: string;
  description: string;
  color: string;
  slides: Slide[];
}

export const projects: Project[] = [
  {
    slug: "cycles",
    index: "01",
    name: "Cycles",
    category: "Product",
    description: "Playlist sharing app",
    color: "#FF5C00",
    slides: [
      {
        label: "Slide 1",
        image: "/product/cycles1.png",
        lines: ["cycles", "every adventure", "has a playlist", "share the", "playlist to your", "adventure"],
      },
      {
        label: "Slide 2",
        image: "/product/cycles2.png",
        lines: ["discover", "the perfect playlist", "for any mood or moment", "and save songs", "directly to your spotify"],
      },
      {
        label: "Slide 3",
        image: "/product/cycles3.png",
        lines: ["find", "new friends and", "playlist curators", "and keep up", "with their playlists"],
      },
    ],
  },
  {
    slug: "midime",
    index: "02",
    name: "MIDIME",
    category: "Tool",
    description: "Music pattern analyzer & visualizer",
    color: "#00E5FF",
    slides: [
      { label: "Pattern Canvas" },
      { label: "MIDI Input" },
      { label: "Chord Map" },
    ],
  },
  {
    slug: "elucia",
    index: "03",
    name: "Elucia",
    category: "AI / Education",
    description: "AI-assisted music instrument manuals",
    color: "#FFD600",
    slides: [
      { label: "Instrument Guide", lines: ["learn", "any instrument", "your way"] },
      { label: "AI Assistant", lines: ["powered by", "AI that knows", "your instrument"] },
      { label: "Feature Explorer", lines: ["explore", "features built", "for musicians"] },
    ],
  },
];
