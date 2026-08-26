import { hopeMakaraArticle } from "@/content/journal/hope-makara";

export type ArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "standfirst"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "pullquote"; text?: string; lines?: string[] }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
      layout?: "column" | "wide";
      crop?: "cover" | "natural";
      monochrome?: boolean;
    }
  | { type: "image-caption"; text: string }
  | { type: "short-line-sequence"; lines: string[] }
  | { type: "list"; items: string[] }
  | {
      type: "paragraph-with-link";
      before: string;
      linkText: string;
      href: string;
      after: string;
    };

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  excerpt?: string;
  standfirst?: string;
  author?: string;
  photographer?: string;
  date?: string;
  publishedAt?: string;
  readTime?: string;
  readingTime?: string;
  imageUrl?: string;
  featuredImage?: string;
  imageAlt?: string;
  featured?: boolean;
  content?: ArticleContentBlock[];
}

export function getArticleSubtitle(article: JournalArticle): string | undefined {
  return article.subtitle ?? article.excerpt;
}

export function getArticleDescription(article: JournalArticle): string | undefined {
  return article.standfirst ?? article.excerpt ?? article.subtitle;
}

export function getArticleImageUrl(article: JournalArticle): string | undefined {
  return article.featuredImage ?? article.imageUrl;
}

export function getArticleReadingTime(article: JournalArticle): string | undefined {
  return article.readingTime ?? article.readTime;
}

export const journalCategories = [
  "All",
  "Migration",
  "Identity",
  "Community",
  "Podcast",
  "Behind the Scenes",
] as const;

export const journalArticles: JournalArticle[] = [
  hopeMakaraArticle,
  {
    id: "home-is-a-conversation",
    slug: "home-is-a-conversation",
    title: "Home Is a Conversation",
    category: "Identity",
    excerpt:
      "What it means to carry more than one place inside you, and find belonging in the spaces between.",
    author: "Locker Room Talks",
    date: "March 2025",
    readTime: "6 min read",
    imageUrl: "/images/gallery/gallery-03.png",
    imageAlt: "Two guests in candid dialogue",
    content: [
      {
        type: "paragraph",
        text: "Home is rarely a single address. For many of us, it is a patchwork of languages, accents, and memories that do not always align neatly on a map.",
      },
      {
        type: "paragraph",
        text: "We learn to answer the question where are you from with a pause — not because we do not know, but because the truth is longer than a single place name.",
      },
      {
        type: "pullquote",
        text: "Belonging is not a destination. It is something you negotiate, again and again, in every room you enter.",
      },
      {
        type: "heading",
        level: 2,
        text: "The rooms we carry",
      },
      {
        type: "paragraph",
        text: "Every migration story contains a room left behind: the kitchen where someone cooked, the street where children played, the voice of a parent calling from another room. These rooms travel with us, quiet and persistent.",
      },
      {
        type: "paragraph",
        text: "In a new country, we build new rooms — smaller at first, provisional. A corner of a shared flat. A table at a café where the barista begins to recognise your order. Slowly, the new rooms grow large enough to stand inside.",
      },
    ],
  },
  {
    id: "weight-of-a-new-language",
    slug: "the-weight-of-a-new-language",
    title: "The Weight of a New Language",
    category: "Migration",
    excerpt:
      "On the quiet labour of rebuilding yourself, one unfamiliar word at a time.",
    author: "Farnaz Farahdel",
    date: "May 2025",
    readTime: "7 min read",
    imageUrl: "/images/gallery/gallery-02.png",
    imageAlt: "People gathered in conversation at a tram stop",
    content: [
      {
        type: "paragraph",
        text: "The first winter in Helsinki, I learned that silence has a grammar of its own. In the tram, in the supermarket queue, in the long grey afternoons when the sun barely rose — people spoke sparingly, and I spoke even less.",
      },
      {
        type: "paragraph",
        text: "I had arrived with a suitcase full of confidence and a vocabulary that collapsed the moment someone asked me a follow-up question. My Finnish was textbook-clean and conversationally useless. Every sentence I managed felt like a small performance, watched by an invisible audience of native speakers who were, in fact, simply living their lives.",
      },
      {
        type: "pullquote",
        text: "Learning a language as an adult is not learning to speak. It is agreeing to be a beginner again, in public, every single day.",
      },
      {
        type: "paragraph",
        text: "There is a particular humiliation in mispronouncing a word you have practised alone a hundred times. In the language classroom, everyone is struggling together. On the street, you are struggling alone, and the struggle is visible.",
      },
      {
        type: "paragraph",
        text: "I began to notice how much of my personality lived inside my fluency. In Farsi I was witty, warm, quick to tease. In Finnish I was careful, polite, slightly dim — not because I had become a different person, but because the person I knew how to be required words I did not yet have.",
      },
      {
        type: "image",
        src: "/images/gallery/gallery-02.png",
        alt: "People gathered in conversation at a tram stop",
        caption:
          "A tram stop in Kallio, where half the city seems to be practising a second language at once.",
      },
      {
        type: "heading",
        level: 2,
        text: "The space between two selves",
      },
      {
        type: "paragraph",
        text: "Psychologists sometimes call this the language ego — the version of yourself that exists inside a given tongue. When you migrate, you do not only change geography. You temporarily lose access to the self that your mother tongue made possible.",
      },
      {
        type: "paragraph",
        text: "I would dream in Farsi and wake to Finnish radio. I would write shopping lists in one language and cry in another. The dissonance was not dramatic. It was daily, domestic, exhausting in the way that only invisible labour can be.",
      },
      {
        type: "heading",
        level: 3,
        text: "Small victories",
      },
      {
        type: "list",
        items: [
          "Understanding a joke without needing it explained",
          "Dreaming, briefly, in the new language",
          "Making a phone call without rehearsing the script first",
          "Being mistaken, even once, for a local",
        ],
      },
      {
        type: "paragraph",
        text: "These moments are not milestones on a curriculum. They are proof that the second self is forming — slowly, stubbornly, in the gaps between embarrassment and effort.",
      },
      {
        type: "paragraph-with-link",
        before: "If you are in the middle of this — if your mouth knows one world and your feet stand in another — know that the weight lessens. Not all at once. But word by word, room by room, until one day you realise you have built a home inside a language that once felt entirely foreign. You might also find resonance in our conversation on ",
        linkText: "belonging between two places",
        href: "/journal/belonging-between-two-places",
        after: ".",
      },
    ],
  },
  {
    id: "belonging-between-two-places",
    slug: "belonging-between-two-places",
    title: "Belonging Between Two Places",
    category: "Identity",
    excerpt:
      "Neither fully here nor fully there — and learning to live in the beautiful, difficult middle.",
    author: "Locker Room Talks",
    date: "June 2025",
    readTime: "8 min read",
    imageUrl: "/images/gallery/gallery-01.png",
    imageAlt: "Intimate conversation on the couch",
    content: [
      {
        type: "paragraph",
        text: "To belong in two places at once is to belong fully in neither — or so it can feel, especially in the years when the new country is still new and the old country is already changing without you.",
      },
      {
        type: "paragraph",
        text: "Friends back home move apartments, change jobs, fall in love. You hear about it through screens, time zones widening the gap between their lives and yours. You are present in their stories but absent from their kitchens.",
      },
      {
        type: "pullquote",
        text: "The middle is not a void. It is a vantage point — if you can learn to stand in it without apologising.",
      },
      {
        type: "heading",
        level: 2,
        text: "Learning to hold both",
      },
      {
        type: "paragraph",
        text: "Belonging, I have come to understand, is less about choosing a side and more about learning to hold contradictions without collapsing under them. You can miss a place and still be grateful for the one you are building. You can love your origin and critique it. You can be proud of your accent and tired of explaining it.",
      },
      {
        type: "paragraph",
        text: "The people who thrive in the middle are not those who resolve the tension. They are those who make room for it — who let their identity be large enough to contain more than one story.",
      },
    ],
  },
  {
    id: "behind-the-mic",
    slug: "behind-the-mic",
    title: "Behind the Mic",
    category: "Behind the Scenes",
    excerpt:
      "What happens in the quiet minutes before a conversation begins — and why they matter.",
    author: "Locker Room Talks",
    date: "April 2025",
    readTime: "5 min read",
    imageUrl: "/images/gallery/gallery-05.png",
    imageAlt: "Guest writing notes at the table",
    content: [
      {
        type: "paragraph",
        text: "Every recording begins in silence. Not the polished silence of the final edit, but the lived silence of people arriving, settling, finding their place in a room that will soon hold their voices.",
      },
      {
        type: "paragraph",
        text: "We have learned to protect those minutes. No rush to the microphone. No small talk as filler. Just tea, sometimes, and the slow work of becoming present.",
      },
      {
        type: "heading",
        level: 2,
        text: "The room as a third guest",
      },
      {
        type: "paragraph",
        text: "A good conversation needs more than two people. It needs a room that feels safe enough for honesty — where pauses are not failures and tangents are not distractions, but the shape of real thinking.",
      },
    ],
  },
  {
    id: "the-table-we-share",
    slug: "the-table-we-share",
    title: "The Table We Share",
    category: "Community",
    excerpt:
      "On food, hospitality, and the languages spoken across a single kitchen table.",
    author: "Locker Room Talks",
    date: "February 2025",
    readTime: "6 min read",
    imageUrl: "/images/gallery/gallery-04.png",
    imageAlt: "Guests posing together after recording",
    content: [
      {
        type: "paragraph",
        text: "Every culture has a table. Ours is long, worn, and loud with overlapping stories. Around it, people bring dishes from places the others have never visited — and suddenly, through taste and smell, those places become real.",
      },
      {
        type: "paragraph",
        text: "Food is one of the gentlest ways to cross a border. You do not need perfect grammar to offer someone a plate. You do not need a shared history to accept one.",
      },
      {
        type: "pullquote",
        text: "Hospitality is a language everyone understands, even when the words are unfamiliar.",
      },
      {
        type: "paragraph",
        text: "We have seen strangers become neighbours over shared meals. We have watched quiet people find their voice after the second cup of tea. The table does not solve everything — but it creates the conditions for something true to begin.",
      },
    ],
  },
  {
    id: "what-the-locker-room-taught-us",
    slug: "what-the-locker-room-taught-us",
    title: "What the Locker Room Taught Us",
    category: "Behind the Scenes",
    excerpt:
      "A note on the name, the room, and the particular honesty that arrives once the cameras stop performing.",
    author: "Locker Room Talks",
    date: "March 2025",
    readTime: "5 min read",
    imageUrl: "/images/gallery/gallery-07.png",
    imageAlt: "Two guests seated on the green sofa",
    content: [
      {
        type: "paragraph",
        text: "People sometimes ask about the name. A locker room is where the performance ends — where the jersey comes off, the posture relaxes, and what remains is simply a person, tired and honest, among others who have seen them at their most unguarded.",
      },
      {
        type: "paragraph",
        text: "That is the room we try to build every time we record. Not a stage. Not an interview set with its careful choreography of question and answer. A room where the cameras are present but no longer performing, and neither are we.",
      },
      {
        type: "pullquote",
        text: "The most important part of every conversation happens after the person stops trying to be interesting.",
      },
      {
        type: "heading",
        level: 2,
        text: "What the room asks of us",
      },
      {
        type: "paragraph",
        text: "It asks patience. The first twenty minutes of any conversation are usually rehearsal — the stories people have told before, polished by repetition. The real material waits underneath, and it only surfaces when nobody is reaching for it.",
      },
      {
        type: "paragraph",
        text: "It asks that we listen without planning our next question. And it asks, above all, that we let silence do its work. Some of the truest things our guests have said arrived after a pause we chose not to fill.",
      },
    ],
  },
  {
    id: "winter-and-the-art-of-staying",
    slug: "winter-and-the-art-of-staying",
    title: "Winter, and the Art of Staying",
    category: "Community",
    excerpt:
      "On darkness, endurance, and the small communities that make a long winter survivable.",
    author: "Locker Room Talks",
    date: "February 2025",
    readTime: "6 min read",
    imageUrl: "/images/gallery/gallery-06.png",
    imageAlt: "Guest writing reflections during session",
    content: [
      {
        type: "paragraph",
        text: "Nobody warns you properly about the darkness. They mention it, the way people mention weather — but the Finnish winter is not weather. It is a season of the interior, when the sun becomes a rumour and the days blur into a single long dusk.",
      },
      {
        type: "paragraph",
        text: "The first winter breaks something in almost everyone who arrives from a brighter latitude. The second winter teaches you what the first one broke was necessary: the assumption that life happens outdoors, in daylight, effortlessly.",
      },
      {
        type: "pullquote",
        text: "Survival here is not an individual skill. It is a shared practice, passed from person to person like a candle.",
      },
      {
        type: "heading",
        level: 2,
        text: "The small architecture of endurance",
      },
      {
        type: "paragraph",
        text: "What makes the winter survivable is rarely dramatic. It is the standing invitation for Sunday soup. The neighbour who checks in without making it a favour. The friend who drags you to the sauna when you have not answered messages for a week.",
      },
      {
        type: "paragraph",
        text: "Communities in the north are built the way heat is kept: deliberately, with attention to every gap. And those who learn to stay — really stay, through the dark months — often find that the staying itself becomes the thing they are most proud of.",
      },
    ],
  },
  {
    id: "conversations-that-refuse-to-end",
    slug: "conversations-that-refuse-to-end",
    title: "Conversations That Refuse to End",
    category: "Podcast",
    excerpt:
      "Notes from the edit room, where every episode continues long after the recording light goes dark.",
    author: "Locker Room Talks",
    date: "January 2025",
    readTime: "4 min read",
    imageUrl: "/images/gallery/gallery-08.png",
    imageAlt: "Guests standing together for a portrait",
    content: [
      {
        type: "paragraph",
        text: "An episode does not end when the recording stops. It follows us into the edit room, where we listen again — slower this time — and hear the things we missed in the moment: the catch in a voice, the sentence that almost became a confession.",
      },
      {
        type: "paragraph",
        text: "Editing a conversation is an act of care. Cut too much and you lose the hesitations that made it human. Cut too little and you ask the listener to sit through the throat-clearing that every honest exchange requires.",
      },
      {
        type: "pullquote",
        text: "A good episode is not a record of what was said. It is a record of what it felt like to be in the room.",
      },
      {
        type: "paragraph",
        text: "And then there are the conversations that continue past the episode entirely — in messages from listeners, in guests who return months later to add the chapter they were not ready to tell. Those are the ones that remind us why the microphone was never really the point.",
      },
    ],
  },
];

export const featuredJournalArticle =
  journalArticles.find((article) => article.featured) ?? journalArticles[0];

export function getArticleBody(article: JournalArticle): ArticleContentBlock[] {
  const opening: ArticleContentBlock[] = article.standfirst
    ? [{ type: "standfirst", text: article.standfirst }]
    : [];

  return [...opening, ...(article.content ?? [])];
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((article) => article.slug === slug);
}

export function getArticleIndex(slug: string): number {
  return journalArticles.findIndex((article) => article.slug === slug);
}

export function getAdjacentArticles(slug: string): {
  previous?: JournalArticle;
  next?: JournalArticle;
} {
  const index = getArticleIndex(slug);
  if (index === -1) return {};

  return {
    previous: index > 0 ? journalArticles[index - 1] : undefined,
    next:
      index < journalArticles.length - 1
        ? journalArticles[index + 1]
        : undefined,
  };
}

export function getRelatedArticles(
  slug: string,
  count = 3
): JournalArticle[] {
  const current = getArticleBySlug(slug);
  if (!current) return journalArticles.slice(0, count);

  const others = journalArticles.filter((article) => article.slug !== slug);

  const sameCategory = others.filter(
    (article) => article.category === current.category
  );
  const differentCategory = others.filter(
    (article) => article.category !== current.category
  );

  return [...sameCategory, ...differentCategory].slice(0, count);
}
