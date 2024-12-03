import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export const Hero = ({ className }: Props) => {
  return (
    <div className={twMerge("relative h-[90dvh] min-h-[48rem]", className)}>
      <video
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
        // poster="/video-poster.jpg"
      >
        <source src="/videos/video-1.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute top-1/2 -translate-y-1/2 left-[--page-padding] space-y-4">
        <h1 className="text-5xl font-bold text-white">Arcane</h1>
        <p className="max-w-xs md:max-w-lg text-white">
          Following a bitter falling-out, two sisters land on opposite sides of
          an all-consuming war in this Emmy-winning saga IGN calls `&quot;truly
          a masterpiece.`&quot;
        </p>
        <div className="flex space-x-3">
          <button className="px-8 py-2 bg-white text-black rounded hover:bg-white/80">
            Play
          </button>
          <button className="px-8 py-2 bg-gray-500/70 text-white rounded hover:bg-gray-500/50">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
