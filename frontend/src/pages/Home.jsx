import Hero from "../components/hero/Hero";
import About from "../components/about/About";
import Skills from "../components/skills/Skills";
import Projects from "../components/projects/Projects";
import Architecture from "../components/architecture/Architecture";
import Contact from "../components/contact/Contact";
import AIAssistant from "../components/ai/AIAssistant";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Architecture />
      <Contact />
      <AIAssistant />
    </>
  );
}