import { DOMParser } from "linkedom";

export type OGPData = {
  title: string;
  description: string;
  thumbnail: string;
};

export const extractOGPData = (html: string): OGPData => {
  // parseFromString の戻り値を明示的に受け取る
  const dom = new DOMParser().parseFromString(html, "text/html");
  const metaTags = Array.from(dom.querySelectorAll("meta[property^='og:']")) as HTMLMetaElement[];

  const data = metaTags.reduce<Record<string, string>>((acc, meta) => {
    const property = meta.getAttribute("property")?.replace("og:", "");
    if (property) {
      acc[property] = meta.getAttribute("content") || "";
    }
    return acc;
  }, {});

  return {
    title: data.title || "",
    description: data.description || "",
    thumbnail: data.image || "",
  };
};
