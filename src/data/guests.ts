import hopeMakaraPhoto from "@/assets/hope-makara.png";
import asmaraRiazPhoto from "@/assets/asmara-riaz.png";
import mariiJuhtPhoto from "@/assets/marii-juht.png";
import farhanaSayeedPhoto from "@/assets/farhana-sayeed.png";

export interface Guest {
  id: string;
  name: string;
  bioShort: string;
  bioFull?: string;
  imageUrl: string;
  tags: string[];
  youtubeUrl: string;
  appleUrl: string;
  slug?: string;
  /** CSS object-position value for the photo, e.g. "top", "center", "25%" */
  imagePosition?: string;
  /** Whether to show this guest on the homepage "Meet the voices" section. Defaults to true. */
  showOnHome?: boolean;
}

export const guests: Guest[] = [
  {
    id: "hope-makara",
    name: "Hope Makara",
    slug: "hope-makara",
    bioShort:
      "A licensed sosionomi and co-founder of MIELI Without Borders, passionate about mental health and creating spaces where people feel connected.",
    bioFull:
      "Hope is a licensed sosionomi and one of the founders of MIELI Without Borders, a member organization of MIELI and a non-profit organization dedicated to promoting migrant mental health. She is passionate about mental health and finding everyday ways to care for well-being. She enjoys supporting others in their lives and creating spaces where people feel connected and understood. Having lived in Finland for ten years, she appreciates the rare sunshine, loves handicrafts, and enjoys exploring new foods.",
    imageUrl: hopeMakaraPhoto,
    tags: ["mental health", "migrant wellbeing"],
    youtubeUrl: "#",
    appleUrl: "#",
  },
  {
    id: "asmara-riaz",
    name: "Asmara Riaz",
    slug: "asmara-riaz",
    bioShort:
      "A dedicated professional focused on supporting internationals and facilitating integration, helping people navigate complex systems.",
    bioFull:
      "Asmara is a dedicated professional focused on supporting internationals and facilitating integration, helping people navigate complex systems and access meaningful opportunities. She is curious, adaptable, and genuinely enjoys connecting with individuals from diverse backgrounds, creating spaces where people feel seen, supported, and empowered. Personally, she loves watching movies, traveling, and exploring questions of identity and belonging—sometimes a little lost, always learning. She first came to Finland to study and has been living here for 13 years.",
    imageUrl: asmaraRiazPhoto,
    tags: ["integration", "belonging"],
    youtubeUrl: "#",
    appleUrl: "#",
    imagePosition: "center",
  },
  {
    id: "marii-juht",
    name: "Marii Juht",
    slug: "marii-juht",
    bioShort:
      "A passionate advocate and professional dedicated to supporting communities and creating meaningful connections across cultures.",
    bioFull:
      "Marii Juht is the founder of Intero Integration, focused on making global mobility more human—so relocation becomes more than paperwork, and people can truly settle, belong, and stay. Having moved to Finland in December 2020, she understands integration not only professionally, but personally.",
    imageUrl: mariiJuhtPhoto,
    tags: ["community", "dialogue"],
    youtubeUrl: "#",
    appleUrl: "#",
    imagePosition: "center",
  },
  {
    id: "farhana-sayeed",
    name: "Farhana Sayeed",
    slug: "farhana-sayeed",
    bioShort:
      "A professional with a background in pharmacy, public health, and medical computing, passionate about wellbeing, resilience, and human-centered health systems.",
    bioFull:
      "Farhana has a background in pharmacy, public health, and medical computing, with experience working at the intersection of healthcare, technology, and quality systems. She cares deeply about improving health outcomes and making systems more human-centered, especially for people navigating complex environments and life transitions.\n\nShe is particularly interested in wellbeing, resilience, and how everyday practices at work and in life can support mental and physical health. Having lived across cultures, she values connection, empathy, and creating spaces where people feel safe, heard, and respected.\n\nLiving in Finland for 5 years has shaped her appreciation for nature, quiet reflection, and balance. She enjoys walks in nature, meaningful conversations over tea, and continuously learning about people, cultures, and traveling.",
    imageUrl: farhanaSayeedPhoto,
    tags: ["wellbeing", "health systems"],
    youtubeUrl: "#",
    appleUrl: "#",
    imagePosition: "center 20%",
    showOnHome: false,
  },
];
