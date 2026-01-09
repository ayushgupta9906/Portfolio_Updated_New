import { WarpBackground } from "@/components/3d/warp-background";
import { HeroHUD } from "@/components/sections/hero-hud";
import { FloatingDock } from "@/components/ui/floating-dock";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { About } from "@/components/sections/about";
import { SkillsSphere } from "@/components/sections/skills-sphere";
import { ProjectsCarousel } from "@/components/sections/projects-carousel";
import { ExperienceScroll } from "@/components/sections/experience-scroll";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-cyan-500/30 cursor-none">
      <CustomCursor />
      <ThemeToggle />
      <WarpBackground />
      <HeroHUD />
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
