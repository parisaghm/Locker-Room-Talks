import GuestCard from "../GuestCard";
import ScrollArrow from "../ScrollArrow";
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
    <section id="contact" className="min-h-0 md:min-h-[100svh] w-full max-w-full min-w-0 relative flex flex-col justify-start md:justify-center px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-12 pb-16 sm:pb-24 md:pb-32 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full min-w-0 overflow-x-hidden">
        <div className="text-center mb-6 md:mb-8 min-w-0">
          <h2 className="heading-lg mb-4 break-words">
            Meet the voices<span className="dot-green"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] xl:grid-cols-[repeat(3,minmax(0,1fr))] gap-4 sm:gap-5 md:gap-6 items-stretch w-full min-w-0">
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
        <div className="hero-bottom-group flex flex-col items-center mt-8 sm:mt-12 md:mt-20">
          <ScrollArrow targetId="gallery" />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
