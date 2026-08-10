import { createFileRoute } from "@tanstack/react-router";
import Nav from "../components/Nav.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import Skills from "../components/Skills.jsx";
import Projects from "../components/Projects.jsx";
import Contact from "../components/Contact.jsx";
import GridLines from "../components/GridLines.jsx";
import DinoGame from "../components/DinoGame.jsx";
import ParticleField from "../components/ParticleField.jsx";
import useSmoothScroll from "../hooks/useSmoothScroll.js";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arjun — Developer, Game Dev & Robotics" },
      {
        name: "description",
        content:
          "Portfolio of Arjun, a developer and maker from Kerala building games, robots, creative AI tooling and full-stack projects.",
      },
      { property: "og:title", content: "Arjun — Games, Robots & Full-Stack Tools" },
      {
        property: "og:description",
        content:
          "Swiss-style portfolio: Unity game dev, ESP32 robotics, creative AI tooling and full-stack builds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Single-page portfolio: all sections stack under a fixed nav.
function Index() {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ParticleField />
      <GridLines />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
      <DinoGame />
      <Contact />
    </div>
  );
}
