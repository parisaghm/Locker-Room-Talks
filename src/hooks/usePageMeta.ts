import { useEffect } from "react";

interface PageMeta {
  title: string;
  description?: string;
  ogImage?: string;
}

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string
): () => void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );
  const created = !element;
  const previous = element?.getAttribute("content") ?? null;

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);

  return () => {
    if (created) {
      element?.remove();
    } else if (previous !== null) {
      element?.setAttribute("content", previous);
    }
  };
}

/**
 * Sets document title and description/Open Graph tags for a page, restoring
 * the defaults from index.html when the page unmounts.
 */
export function usePageMeta({ title, description, ogImage }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const restorers: Array<() => void> = [
      upsertMeta("property", "og:title", title),
    ];

    if (description) {
      restorers.push(
        upsertMeta("name", "description", description),
        upsertMeta("property", "og:description", description)
      );
    }
    if (ogImage) {
      restorers.push(upsertMeta("property", "og:image", ogImage));
    }

    return () => {
      document.title = previousTitle;
      restorers.forEach((restore) => restore());
    };
  }, [title, description, ogImage]);
}
