
import { WarpBackground } from "@/components/3d/warp-background";
import { HeroHUD } from "@/components/sections/hero-hud";
import { FloatingDock } from "@/components/ui/floating-dock";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { About } from "@/components/sections/about";
import { SkillsSphere } from "@/components/sections/skills-sphere";
import { ProjectsCarousel } from "@/components/sections/projects-carousel";
import { ExperienceScroll } from "@/components/sections/experience-scroll";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import fs from "fs";
import path from "path";

export default async function Home() {
  // Read frames dynamically
  const framesDir = path.join(process.cwd(), "public/frames");
  let frames: string[] = [];

  try {
    const files = await fs.promises.readdir(framesDir);
    frames = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
      .map((file) => `/frames/${file}`);
  } catch (error) {
    console.error("Error reading frames directory:", error);
  }

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-cyan-500/30 cursor-none">
      <CustomCursor />
      <WarpBackground />
      <HeroHUD frames={frames} />
      <About />
      <SkillsSphere />
      <ExperienceScroll />
      <ProjectsCarousel />
      <Education />
      <Contact />
      <Footer />
      <FloatingDock />
    </div>
  );
}
