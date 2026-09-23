import Image from "next/image";
import { MapPin } from "lucide-react";
import portrait from "@/assets/ishaan-shete.jpg";
import { site } from "@/content/site";
import { PauseOffscreen } from "./pause-offscreen";
import { WaterfallScene } from "./waterfall-scene";

export function HeroVisual() {
  return (
    <figure className="mx-auto w-full max-w-[560px] lg:mr-0">
      <div className="relative">
        <PauseOffscreen className="relative aspect-[6/7] overflow-hidden rounded-t-[999px] rounded-b-[2.25rem] border border-line bg-surface-2 shadow-[0_40px_80px_-48px_rgb(10_60_45/0.45)]">
          <WaterfallScene />
        </PauseOffscreen>

        <div className="absolute -bottom-6 -left-2 w-[42%] min-w-[150px] max-w-[230px] -rotate-[5deg] rounded-[1.4rem] border border-line bg-surface p-2 shadow-[0_24px_48px_-20px_rgb(0_0_0/0.35)] transition-transform duration-500 hover:rotate-0 sm:-left-8">
          <Image
            src={portrait}
            alt={site.portrait.alt}
            placeholder="blur"
            preload
            sizes="(min-width: 1024px) 230px, 42vw"
            className="aspect-square w-full rounded-[1rem] object-cover"
          />
          <p className="px-1.5 pb-1 pt-2.5 font-display text-[0.95rem] font-semibold tracking-tight text-ink">
            {site.portrait.tag}
          </p>
        </div>
      </div>

      <figcaption className="mt-14 flex items-center gap-1.5 text-sm font-medium text-ink-2 sm:mt-6 sm:justify-end">
        <MapPin className="size-3.5 text-accent" aria-hidden="true" />
        {site.scene.caption}
      </figcaption>
    </figure>
  );
}
