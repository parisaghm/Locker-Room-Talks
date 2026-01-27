import { useState } from "react";
import GuestCard from "../GuestCard";
import hopeMakaraPhoto from "@/assets/hope-makara.png";
import asmaraRiazPhoto from "@/assets/asmara-riaz.png";

const ContactSection = () => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const guests = [
    {
      id: "hope-makara",
      name: "Hope Makara",
      photo: asmaraRiazPhoto,
      summary:
        "A licensed sosionomi and co-founder of MIELI Without Borders, passionate about mental health and creating spaces where people feel connected and understood.",
      fullBio:
        "Hope is a licensed sosionomi and one of the founders of MIELI Without Borders, a member organization of MIELI and a non-profit organization dedicated to promoting migrant mental health. She is passionate about mental health and finding everyday ways to care for well-being. She enjoys supporting others in their lives and creating spaces where people feel connected and understood. Having lived in Finland for ten years, she appreciates the rare sunshine, loves handicrafts, and enjoys exploring new foods.",
      tags: ["mental health", "migrant wellbeing"],
      youtubeUrl: "#",
      applePodcastsUrl: "#",
    },
    {
      id: "asmara-riaz",
      name: "Asmara Riaz",
      photo: hopeMakaraPhoto,
      summary:
        "A dedicated professional focused on supporting internationals and facilitating integration, helping people navigate complex systems and access meaningful opportunities.",
      fullBio:
        "Asmara is a dedicated professional focused on supporting internationals and facilitating integration, helping people navigate complex systems and access meaningful opportunities. She is curious, adaptable, and genuinely enjoys connecting with individuals from diverse backgrounds, creating spaces where people feel seen, supported, and empowered. Personally, she loves watching movies, traveling, and exploring questions of identity and belonging—sometimes a little lost, always learning. She first came to Finland to study and has been living here for 13 years.",
      tags: ["integration", "belonging"],
      youtubeUrl: "#",
      applePodcastsUrl: "#",
    },
  ];

  return (
    <section id="contact" className="section-full py-12 md:py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="heading-lg mb-4">
            Meet the voices<span className="dot-green"></span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground lowercase">
            This week's guests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 max-w-3xl mx-auto items-start">
          {guests.map((guest) => (
            <GuestCard
              key={guest.id}
              id={guest.id}
              name={guest.name}
              photo={guest.photo}
              summary={guest.summary}
              fullBio={guest.fullBio}
              tags={guest.tags}
              youtubeUrl={guest.youtubeUrl}
              applePodcastsUrl={guest.applePodcastsUrl}
              isExpanded={!!expandedIds[guest.id]}
              onToggleExpanded={() => toggleExpanded(guest.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
