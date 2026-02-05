import ScrollArrow from "../ScrollArrow";
import parisaGhasemi from "@/assets/parisa-ghasemi.png";
import farnazFarahdel from "@/assets/farnaz-farahdel.png";
import teamMember3 from "@/assets/team-member-3.png";

const teamMembers = [
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
    noHover: true
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="h-[100svh] w-full relative flex flex-col justify-center px-6 md:px-12 lg:px-20 py-8 md:py-10 overflow-hidden">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="heading-lg mb-4">
            team<span className="dot-teal"></span>
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Created by a small, independent team working across editorial, production, and visual design.
            The project is shaped collaboratively, with close attention to conversation, cultural context,
            and care in representation.
          </p>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto mb-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center group">
              {/* Photo Frame */}
              <div className="relative mb-6 p-1.5 bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-full h-full object-cover object-center transition-all duration-500 ${member.noHover ? 'grayscale' : 'grayscale group-hover:grayscale-0'}`}
                  />
                </div>
              </div>
              {/* Name & Role */}
              <h3 className="text-lg md:text-xl font-bold text-center mb-1 capitalize">{member.name}</h3>
              <p className="text-sm text-muted-foreground text-center mb-4 font-bold">{member.role}</p>
              {/* Bio */}
              <p className="text-sm text-muted-foreground text-center leading-relaxed max-w-sm">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-bottom-group flex flex-col items-center mt-12 md:mt-20">
        <ScrollArrow targetId="contact" />
      </div>
    </section>
  );
};

export default TeamSection;
