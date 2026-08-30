/**
 * Shared aspect-ratio classification for Journal imagery, so hero and inline
 * figures size themselves from the file's native proportions instead of being
 * forced into a fixed frame.
 */
export type ImageShape = "landscape" | "portrait" | "square";

export function shapeFromRatio(width: number, height: number): ImageShape {
  const ratio = width / height;
  if (ratio >= 1.2) return "landscape";
  if (ratio <= 0.86) return "portrait";
  return "square";
}
