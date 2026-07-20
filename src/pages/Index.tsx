import CornerNav from "@/components/CornerNav";
import HeroSection from "@/components/sections/HeroSection";
import AboutProjectSection from "@/components/sections/AboutProjectSection";
import TeamSection from "@/components/sections/TeamSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import HomeJournalIntro from "@/components/sections/HomeJournalIntro";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <>
      <CornerNav />
      <main className="w-full min-w-0 max-w-full overflow-x-hidden">
        <HeroSection />
        <AboutProjectSection />
        <TeamSection />
        <ContactSection />
        <HomeJournalIntro />
        <GallerySection />

      </main>
      <FooterSection />
    </>
  );
};

export default Index;
