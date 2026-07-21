import React, { useState, useCallback } from 'react';
import LoadingScreen from '@/components/portfolio/LoadingScreen';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import InteractiveBackground from '@/components/portfolio/InteractiveBackground';
import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import EducationSection from '@/components/portfolio/EducationSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import TechGalaxy from '@/components/portfolio/TechGalaxy';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import AchievementsSection from '@/components/portfolio/AchievementsSection';
import CurrentlyBuilding from '@/components/portfolio/CurrentlyBuilding';
import TerminalSection from '@/components/portfolio/TerminalSection';
import CompetitiveStats from '@/components/portfolio/CompetitiveStats';
import ArchitectureDiagram from '@/components/portfolio/ArchitectureDiagram';
import ShadowTraceDemo from '@/components/portfolio/ShadowTraceDemo';
import GitHubSection from '@/components/portfolio/GitHubSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import XPBar from '@/components/portfolio/XPBar';
import AIAssistant from '@/components/portfolio/AIAssistant';
import { useRecruiterMode } from '@/components/portfolio/RecruiterModeContext';

function PortfolioContent({ loaded }) {
  const { recruiterMode } = useRecruiterMode();

  if (!loaded) return null;

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />

        {recruiterMode ? (
          /* Recruiter Mode: prioritized sections, reduced animations */
          <>
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <GitHubSection />
            <ContactSection />
          </>
        ) : (
          /* Standard Mode: full experience */
          <>
            <AboutSection />
            <EducationSection />
            <SkillsSection />
            <TechGalaxy />
            <ProjectsSection />
            <ExperienceSection />
            <AchievementsSection />
            <CurrentlyBuilding />
            <TerminalSection />
            <ArchitectureDiagram />
            <ShadowTraceDemo />
            <CompetitiveStats />
            <GitHubSection />
            <ContactSection />
          </>
        )}
      </main>
      <Footer />
      <XPBar />
      {/* <AIAssistant /> */}
    </>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <div className="min-h-screen bg-obsidian text-silver relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Interactive particle background */}
      <InteractiveBackground />

      {/* Loading screen */}
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <PortfolioContent loaded={loaded} />
    </div>
  );
}