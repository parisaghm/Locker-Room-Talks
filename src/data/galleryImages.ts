export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  /** Who is pictured, when we know. Left blank rather than guessed. */
  guest?: string;
  /** The episode or session this frame belongs to, when we know. */
  episode?: string;
  /**
   * Only images marked true reach the homepage. The homepage stays a curated
   * preview — adding an image here does not automatically publish it there.
   */
  featuredOnHome?: boolean;
  /** Display order, ascending. Gaps are fine; leave room to slot images in. */
  order: number;
  /** Intrinsic pixel size, so the browser can reserve space before load. */
  width: number;
  height: number;
}

/**
 * The single source of truth for both the homepage preview and /gallery.
 * To add a photo: drop the file in public/images/gallery/ and add an entry
 * here. Set featuredOnHome only if it earns a place in the curated preview.
 */
export const galleryImages: GalleryImage[] = [
  {
    id: "living-room-light-setup",
    src: "/images/gallery/living-room-light-setup.jpg",
    alt: "A photographer adjusting a softbox on a stand in a bright living room, with a green sectional sofa, patterned rug and snow-covered forest through floor-to-ceiling windows",
    caption: "Setting the room before anyone arrives",
    featuredOnHome: true,
    order: 10,
    width: 1784,
    height: 2560,
  },
  {
    id: "behind-the-scenes-camera-setup",
    src: "/images/gallery/behind-the-scenes-camera-setup.jpg",
    alt: "A woman in a blue cardigan leaning over a Canon camera mounted on a tripod, an LED panel light glowing beside her",
    caption: "Framing the first shot",
    featuredOnHome: true,
    order: 20,
    width: 1968,
    height: 2560,
  },
  {
    id: "gallery-03",
    src: "/images/gallery/gallery-03.png",
    alt: "Two guests mid-conversation in a sunlit room, both gesturing as they speak",
    caption: "Voices in conversation",
    featuredOnHome: true,
    order: 30,
    width: 1024,
    height: 683,
  },
  {
    id: "winter-table-conversation",
    src: "/images/gallery/winter-table-conversation.jpg",
    alt: "Three people talking around a dining table set with tea, pastries and lit candles, snow-covered pines outside the window",
    caption: "Tea, and the long way into a story",
    featuredOnHome: true,
    order: 40,
    width: 1448,
    height: 1086,
  },
  {
    id: "portrait-blue-cardigan",
    src: "/images/gallery/portrait-blue-cardigan.jpg",
    alt: "A smiling woman in a blue cardigan holding a phone, standing against a white painted brick wall beside a houseplant",
    caption: "Between setups",
    featuredOnHome: true,
    order: 50,
    width: 1032,
    height: 1280,
  },
  {
    id: "gallery-08",
    src: "/images/gallery/gallery-08.png",
    alt: "Two guests standing side by side for a portrait against a white brick wall",
    caption: "Faces of the conversation",
    featuredOnHome: true,
    order: 60,
    width: 1024,
    height: 683,
  },
  {
    id: "gallery-06",
    src: "/images/gallery/gallery-06.png",
    alt: "A guest in a headscarf writing in a notebook at a sunlit table",
    caption: "Words on paper",
    featuredOnHome: true,
    order: 70,
    width: 682,
    height: 1024,
  },
  {
    id: "studio-cat",
    src: "/images/gallery/studio-cat.jpg",
    alt: "A tabby and white cat held in someone's arms, wearing a small black knitted hat, looking up at the camera",
    caption: "The unofficial fourth host",
    featuredOnHome: false,
    order: 140,
    width: 1280,
    height: 854,
  },
  {
    id: "gallery-07",
    src: "/images/gallery/gallery-07.png",
    alt: "Two guests seated together on a green sofa beside a window and a tall houseplant",
    caption: "Shared space, shared stories",
    featuredOnHome: true,
    order: 90,
    width: 683,
    height: 1024,
  },

  // ——— /gallery only ———

  {
    id: "gallery-01",
    src: "/images/gallery/gallery-01.png",
    alt: "A guest in a headscarf seated on a green sofa against a sunlit white brick wall",
    caption: "Moments of reflection",
    featuredOnHome: false,
    order: 100,
    width: 1024,
    height: 682,
  },
  {
    id: "gallery-02",
    src: "/images/gallery/gallery-02.png",
    alt: "Two guests standing and laughing mid-conversation, one gesturing with both hands",
    caption: "Stories that connect us",
    featuredOnHome: false,
    order: 110,
    width: 1024,
    height: 683,
  },
  {
    id: "hallway-conversation",
    src: "/images/gallery/hallway-conversation.jpg",
    alt: "A bearded man in a green sweater talking and gesturing to a woman in a white cardigan holding a glass, in a white brick hallway",
    caption: "The conversation that carries on after recording",
    featuredOnHome: true,
    order: 80,
    width: 960,
    height: 1280,
  },
  {
    id: "gallery-04",
    src: "/images/gallery/gallery-04.png",
    alt: "Two guests standing together for a portrait after recording",
    caption: "Building bridges",
    featuredOnHome: false,
    order: 130,
    width: 1024,
    height: 683,
  },
  {
    id: "between-takes-with-the-cat",
    src: "/images/gallery/between-takes-with-the-cat.jpg",
    alt: "A man in headphones bending down to greet a cat beside a phone mounted on a stand, in front of a white brick fireplace",
    caption: "Between takes",
    featuredOnHome: false,
    order: 120,
    width: 970,
    height: 1280,
  },
  {
    id: "gallery-05",
    src: "/images/gallery/gallery-05.png",
    alt: "A guest writing notes at a table in warm evening light",
    caption: "Thoughts taking shape",
    featuredOnHome: false,
    order: 150,
    width: 683,
    height: 1024,
  },
  {
    id: "gallery-10",
    src: "/images/gallery/gallery-10.png",
    alt: "A guest in a white sweater writing in a notebook at a table, artwork on the wall behind her",
    caption: "A quiet writing moment",
    featuredOnHome: false,
    order: 160,
    width: 683,
    height: 1024,
  },
];

const byOrder = (a: GalleryImage, b: GalleryImage) => a.order - b.order;

/** The complete collection, for /gallery. */
export const allGalleryImages: GalleryImage[] = [...galleryImages].sort(byOrder);

/** The curated homepage preview — only images explicitly marked for it. */
export const homeGalleryImages: GalleryImage[] = allGalleryImages.filter(
  (image) => image.featuredOnHome
);
