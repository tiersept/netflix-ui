import { useRef, useState } from "react";
import { Item } from "./types/item";
import {
  useFloating,
  offset,
  autoUpdate,
  useTransitionStatus,
} from "@floating-ui/react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { SliderItemMeta } from "./SliderItemMeta";
import { Position } from "./types/position";
import { crossAxisByPosition } from "./utils/crossAxisByPosition";

type Props = {
  position: Position;
  item: Item;
};

/**
 * *NOTE: The biggest challenges building this component is its hover state.
 * - [x] Needs to pop out of the parent's overflow hidden which is the slider
 * - [x] We need to ensure the hovered element is only rendered on hover however, when the other element is on top of the original element, we need to trigger the hover out event by the one on top.
 * - [x] Needs to be aware what position it's in to hover out from left, center and right
 *
 * TODO: Refinements/bugs fixes
 * - [] Add auto play video in floating element
 * - [] Block hover until slider finished navigation animation
 * - [] Only one hovered item active globally at a time
 * - [x] Remove use of AnimatePresence and motion.div because popout would lag when animating in/out and scrolling at the same time. Opt for `useTransitionStyles` instead.
 * - [] Find a more performant way to keep the floating element in position when scroll
 */

const POPOUT_SIZE_FACTOR = 1.6;

export const SliderItem = ({ position, item }: Props) => {
  const refElMeta = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isHovering,
    onOpenChange: setIsHovering,
    strategy: "fixed",
    middleware: [
      offset(
        ({ rects }) => {
          const elMetaRect = refElMeta.current?.getBoundingClientRect();

          const elMetaHeight = elMetaRect?.height || 0;

          const crossAxis = crossAxisByPosition(position, rects);

          return {
            mainAxis:
              -rects.reference.height / 2 -
              rects.floating.height / 2 +
              elMetaHeight / 2,
            crossAxis,
          };
        },
        [refElMeta.current]
      ),
    ],
    whileElementsMounted: autoUpdate,
  });

  const rectRefs = refs.domReference.current?.getBoundingClientRect();

  const { isMounted, status } = useTransitionStatus(context);

  return (
    <>
      <div
        ref={refs.setReference}
        className="group relative h-full overflow-hidden rounded-[.2vw]"
        onMouseEnter={() => {
          setIsHovering(true);
        }}
      >
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={item.imageUrl}
            className="absolute inset-0 h-full w-full"
            fill
            sizes="(max-width: 768px) 278px, (max-width: 1024px) 230px, 341px"
            alt={item.title}
          />
        </div>
      </div>

      {isMounted && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            width: rectRefs?.width && rectRefs?.width * POPOUT_SIZE_FACTOR,
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
          className={twMerge(
            "slider-item-floating-wrapper",
            status === "open" ? "z-10" : "z-0"
          )}
        >
          <div
            data-status={status}
            data-position={position}
            className={twMerge(
              "slider-item-floating relative h-full overflow-hidden rounded-[.2vw]",
              status === "open"
                ? "shadow-2xl bg-background"
                : "shadow-none bg-transparent"
            )}
          >
            <div className="relative aspect-[16/9] w-full h-full">
              <Image
                src={item.imageUrl}
                className="absolute inset-0 h-full w-full"
                fill
                sizes="(max-width: 768px) 278px, (max-width: 1024px) 230px, 341px"
                alt={item.title}
              />
            </div>

            <SliderItemMeta
              ref={refElMeta}
              status={status}
              duration={item.duration}
              genres={item.genres}
            />
          </div>
        </div>
      )}
    </>
  );
};
