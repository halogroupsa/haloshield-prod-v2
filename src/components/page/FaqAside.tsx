import { Img } from "@/components/ui/Img";
import type { ImageName } from "@/lib/images.generated";

type Props = {
  image: ImageName;
  alt: string;
};

/**
 * Photo for the empty space under an FAQ heading. Place it as the last child of a `flex flex-col` left column:
 * it takes only the height left beside the FaqList (never adds any), so its bottom edge lines up with the last divider.
 * When that leftover is too short for a decent crop (e.g. a two-question list) it hides rather than becoming a strip.
 * Desktop only — below `lg` the FAQ stacks and there is no gap to fill.
 */
export function FaqAside({ image, alt }: Props) {
  return (
    <div className="relative mt-8 hidden min-h-0 flex-1 @container-size lg:block">
      <div className="absolute inset-0 overflow-hidden rounded-[22px] bg-ink-3 [@container(max-height:12rem)]:hidden">
        <Img name={image} alt={alt} sizes="(min-width: 1024px) 30vw, 0px" className="size-full object-cover" />
      </div>
    </div>
  );
}
