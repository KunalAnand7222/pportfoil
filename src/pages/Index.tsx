import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsFlowSection from '@/components/sections/SkillsFlowSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ResumeSection from '@/components/sections/ResumeSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import PortfolioChatbot from '@/components/PortfolioChatbot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsFlowSection />
      <ProjectsSection />
      <ResumeSection />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      <PortfolioChatbot />
    </div>
  );
};

export default Index;
