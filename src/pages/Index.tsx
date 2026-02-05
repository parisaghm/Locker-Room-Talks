import CornerNav from "@/components/CornerNav";
import HeroSection from "@/components/sections/HeroSection";
import AboutProjectSection from "@/components/sections/AboutProjectSection";
import TeamSection from "@/components/sections/TeamSection";
import GallerySection from "@/components/sections/GallerySection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <>
      <CornerNav />
      <main className="w-full">
        <HeroSection />
        <AboutProjectSection />
        <TeamSection />
        <GallerySection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Index;
