export const SliderItemSkeleton = () => (
  <div className="w-[--item-width] grow-0 shrink-0 basis-auto">
    <div className="group relative h-full overflow-hidden rounded-[]">
      <div className="relative aspect-[16/9] w-full">
        <div className="absolute inset-0 h-full w-full animate-pulse bg-neutral-800" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <div className="h-3 w-1/2 animate-pulse rounded bg-neutral-800" />
      </div>
    </div>
  </div>
);
