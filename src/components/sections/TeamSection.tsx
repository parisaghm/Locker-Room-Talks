import parisaGhasemi from "@/assets/parisa-ghasemi.png";
import farnazFarahdel from "@/assets/farnaz-farahdel.png";
import teamMember3 from "@/assets/team-member-3.png";
import ScrollArrow from "../ScrollArrow";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  noHover: boolean;
  grayscale?: boolean;
};

const teamMembers: TeamMember[] = [
  {
    name: "Farnaz Farahdel",
    role: "Concept, Conversation & Editorial Direction",
    image: farnazFarahdel,
    bio: "Originator of Locker Room Talks. Farnaz leads the conversations and shapes the editorial direction of the series, overseeing the tone, structure, and final cut to ensure consistency, care, and aesthetic coherence across episodes.",
    noHover: false
  },
  {
    name: "Parisa Ghasemi",
    role: "Development & Digital Strategy",
    image: parisaGhasemi,
    bio: "Parisa leads the technical development of Locker Room Talks and oversees its digital presence. She is responsible for building and maintaining the platform, supporting content distribution, and shaping the project's online visibility across channels.",
    noHover: false
  },
  {
    name: "Linda Wang",
    role: "Photography & Videography",
    image: teamMember3,
    bio: "Linda leads still photography and supports video capture on set. She specializes in portrait and lifestyle visuals, capturing clean, natural moments that preserve emotion and story with clarity and warmth.",
    noHover: true,
    grayscale: true
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="min-h-0 md:min-h-0 w-full max-w-full min-w-0 relative flex flex-col justify-start px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-12 pb-32 md:pb-48 overflow-x-hidden">
      <div className="container mx-auto w-full min-w-0 px-0 sm:px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="heading-lg mb-4 break-words">
            team<span className="dot-teal"></span>
          </h2>
          <p className="body-text max-w-2xl mx-auto break-words">
            Created by a small, independent team working across editorial, production, and visual design.
            The project is shaped collaboratively, with close attention to conversation, cultural context,
            and care in representation.
          </p>
        </div>

        {/* Team Members — stack on mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto mb-6 w-full min-w-0">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center group min-w-0 w-full">
              {/* Photo Frame — responsive aspect ratio */}
              <div className="relative mb-4 sm:mb-6 p-1.5 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 w-full max-w-[12rem] sm:max-w-[14rem] md:max-w-[16rem] mx-auto">
                <div className="w-full aspect-[3/4] overflow-hidden max-h-64 sm:max-h-72 md:max-h-80">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                    style={{
                      filter: `brightness(0.97) contrast(0.96)${member.grayscale ? ' grayscale(100%)' : ''}`,
                      mixBlendMode: 'normal'
                    }}
                  />
                </div>
              </div>
              {/* Name & Role */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-center mb-1 capitalize break-words">{member.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-center mb-3 sm:mb-4 font-bold break-words px-2">{member.role}</p>
              {/* Bio */}
              <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed max-w-sm mx-auto break-words">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
        <div id="team-arrow" className="hero-bottom-group flex flex-col items-center mt-8 sm:mt-12 md:mt-20">
          <ScrollArrow targetId="contact" />
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
