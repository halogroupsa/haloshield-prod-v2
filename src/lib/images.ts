import { caseStudyImages } from "./case-study-images.generated";
import { images as siteImages } from "./images.generated";

export const images = { ...siteImages, ...caseStudyImages };
export type ImageName = keyof typeof images;
