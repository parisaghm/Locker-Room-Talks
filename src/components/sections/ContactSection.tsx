import GuestCard from "../GuestCard";
import hopeMakaraPhoto from "@/assets/hope-makara.png";
import asmaraRiazPhoto from "@/assets/asmara-riaz.png";
import mariiJuhtPhoto from "@/assets/marii-juht.png";

const ContactSection = () => {
  const guests = [
    {
      id: "hope-makara",
      name: "Hope Makara",
      photo: hopeMakaraPhoto,
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
      photo: asmaraRiazPhoto,
      summary:
        "A dedicated professional focused on supporting internationals and facilitating integration, helping people navigate complex systems and access meaningful opportunities.",
      fullBio:
        "Asmara is a dedicated professional focused on supporting internationals and facilitating integration, helping people navigate complex systems and access meaningful opportunities. She is curious, adaptable, and genuinely enjoys connecting with individuals from diverse backgrounds, creating spaces where people feel seen, supported, and empowered. Personally, she loves watching movies, traveling, and exploring questions of identity and belonging—sometimes a little lost, always learning. She first came to Finland to study and has been living here for 13 years.",
      tags: ["integration", "belonging"],
      youtubeUrl: "#",
      applePodcastsUrl: "#",
    },
    {
      id: "marii-juht",
      name: "Marii Juht",
      photo: mariiJuhtPhoto,
      summary:
        "A passionate advocate and professional dedicated to supporting communities and creating meaningful connections.",
      fullBio:
        "Marii Juht is the founder of Intero Integration, focused on making global mobility more human—so relocation becomes more than paperwork, and people can truly settle, belong, and stay. Having moved to Finland in December 2020, she understands integration not only professionally, but personally.",
      tags: ["community", "dialogue"],
      youtubeUrl: "#",
      applePodcastsUrl: "#",
    },
  ];

  return (
    <section id="contact" className="section-full h-[100svh] flex flex-col justify-center px-6 py-10 md:py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="heading-lg mb-4">
            Meet the voices<span className="dot-green"></span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground lowercase">
            This week's guests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
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
              imagePosition={guest.id === "asmara-riaz" || guest.id === "marii-juht" ? "center" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
