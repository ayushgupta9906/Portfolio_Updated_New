
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
// Statically generate frame paths — avoids fs.readdir issues on Vercel at runtime
const TOTAL_FRAMES = 40;
const frames: string[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return `/frames/ezgif-frame-${num}.jpg`;
});

export default async function Home() {

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
