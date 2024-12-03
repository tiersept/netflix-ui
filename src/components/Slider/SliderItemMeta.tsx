import { ChevronDown, Dot, Play, Plus, ThumbsUp } from "lucide-react";
import { forwardRef, Fragment } from "react";
import { Item } from "./types/item";

type Props = {
  status: "unmounted" | "initial" | "open" | "close";
} & Pick<Item, "duration" | "genres">;

export const SliderItemMeta = forwardRef<HTMLDivElement, Props>(
  ({ status, duration, genres }, ref) => {
    return (
      <div
        ref={ref}
        data-status={status}
        className={
          "slider-item-floating-meta px-2 py-3 md:px-5 md:py-6 text-xs text-white"
        }
      >
        <div className="flex justify-between mb-6">
          <div className="flex gap-3">
            <button className="button-round filled">
              <Play
                fill="bg-background"
                stroke="bg-background"
                className="size-[3.2vw] md:size-[1.6vw]"
              />
            </button>
            <button className="button-round outline">
              <Plus className="size-[3.2vw] md:size-[1.6vw]" />
            </button>
            <button className="button-round outline">
              <ThumbsUp className="size-[2vw] md:size-[1.2vw]" />
            </button>
          </div>

          <div>
            <button className="button-round outline">
              <ChevronDown className="size-[3.2vw] md:size-[1.6vw]" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-white/60">{duration}</span>

          <span className="font-black py-0.5 px-1 border rounded-md scale-y-78">
            HD
          </span>
        </div>

        {genres?.length > 0 ? (
          <div className="flex items-center gap-0.5 text-base flex-wrap">
            {genres.map((genre, index) => (
              <Fragment key={genre}>
                <span>{genre}</span>
                {index !== genres.length - 1 && <Dot />}
              </Fragment>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

SliderItemMeta.displayName = "SliderItemMeta";
