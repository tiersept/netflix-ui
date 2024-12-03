"use client";

import type { CSSProperties } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SliderItem } from "./SliderItem";
import { Item } from "./types/item";
import { SliderItemSkeleton } from "./SliderItemSkeleton";
import Link from "next/link";
import { determinePosition } from "./utils/determinePosition";
import { EASE_DEFAULT } from "@/constants/animation";

const PEEK_ITEMS = 1;

type Props = {
  items?: Item[];
};

/**
 * *NOTE: Virtualized slider
 * - [x] Keep dom count minimal
 * - [x] Infinite loop
 * - [x] Performant way of determining visible items and calculating item size
 * - [x] Fully responsive, let browser handle all layout calculations
 * - [x] Skeleton items
 *
 * TODO: Refinements/bugs fixes
 * - [] Re-init visible items on breakpoint change
 * - [] Dynamically load items
 * - [] Preload images
 */

export const Slider = ({ items = [] }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Item[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);

  const TOTAL_ITEMS = items.length;

  const getVisibleMovies = useCallback(() => {
    const visibleItems = containerRef.current
      ? Number.parseInt(
          getComputedStyle(containerRef.current).getPropertyValue(
            "--visible-items"
          )
        )
      : 3;

    const start = currentIndex - PEEK_ITEMS;
    const end = currentIndex + visibleItems + PEEK_ITEMS;

    return Array.from({ length: end - start }, (_, index) => {
      const movieIndex = (start + index + TOTAL_ITEMS) % TOTAL_ITEMS;
      return { ...items[movieIndex], key: `${movieIndex}-${currentIndex}` };
    });
  }, [TOTAL_ITEMS, currentIndex, items]);

  const handleNavigation = useCallback(
    (newDirection: number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        const visibleItems = containerRef.current
          ? Number.parseInt(
              getComputedStyle(containerRef.current).getPropertyValue(
                "--visible-items"
              )
            )
          : 3;

        const newIndex =
          (prevIndex + newDirection * visibleItems + TOTAL_ITEMS) % TOTAL_ITEMS;
        return newIndex;
      });
    },
    [TOTAL_ITEMS, isAnimating]
  );

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    const visibleMovies = getVisibleMovies();
    setVisibleItems(visibleMovies);
  }, [getVisibleMovies]);

  useEffect(() => {
    if (visibleItems.length > 0) {
      setIsReady(true);
    }
  }, [visibleItems]);

  return (
    <>
      <div
        className="relative w-full [--grid-gap:.2vw] [--padding:var(--page-padding)] [--visible-items:2] sm:[--visible-items:4] lg:[--visible-items:5] xl:[--visible-items:6]"
        style={
          {
            "--gap-to-include": "calc(var(--grid-gap) / var(--visible-items))",
            "--item-width":
              "calc(100% / var(--visible-items) - var(--grid-gap) + var(--gap-to-include))",
          } as CSSProperties
        }
      >
        <div className="relative w-full overflow-hidden" ref={containerRef}>
          <div className="px-[var(--padding)]">
            <AnimatePresence
              initial={false}
              custom={direction}
              onExitComplete={handleAnimationComplete}
              mode="popLayout"
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? "100%" : "-100%",
                  }),
                  center: {
                    x: 0,
                  },
                  exit: (direction: number) => ({
                    x: direction > 0 ? "-200%" : "200%",
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={EASE_DEFAULT}
                className="position w-full flex gap-[var(--grid-gap)]"
                style={{
                  marginLeft: "calc(-1 * var(--item-width) - var(--grid-gap))",
                }}
              >
                {isReady
                  ? visibleItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="w-[--item-width] grow-0 shrink-0 basis-auto"
                      >
                        <Link
                          href=""
                          aria-label={item.title}
                          role="link"
                          aria-hidden="false"
                          tabIndex={0}
                        >
                          <SliderItem
                            position={determinePosition({
                              index,
                              length: visibleItems.length,
                            })}
                            item={item}
                          />
                        </Link>
                      </div>
                    ))
                  : Array.from({ length: 8 }).map((_, index) => (
                      <SliderItemSkeleton key={index} />
                    ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="absolute left-0 top-1/2 z-10 flex h-full w-[calc(var(--padding)-var(--grid-gap))] -translate-y-1/2 transform items-center justify-center bg-neutral-950/60"
            onClick={() => handleNavigation(-1)}
            aria-label="Previous movies"
            tabIndex={0}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="absolute right-0 top-1/2 z-10 flex h-full w-[calc(var(--padding)-var(--grid-gap))] -translate-y-1/2 transform items-center justify-center bg-neutral-950/60"
            onClick={() => handleNavigation(1)}
            aria-label="Next movies"
            tabIndex={0}
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  );
};
