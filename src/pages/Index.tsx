import CornerNav from "@/components/CornerNav";
import HeroSection from "@/components/sections/HeroSection";
import TeamSection from "@/components/sections/TeamSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <>
      <CornerNav />
      <main className="w-full">
        <HeroSection />
        <TeamSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
};

export default Index;
