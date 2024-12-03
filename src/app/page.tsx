import Header from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Slider } from "@/components/Slider";
import { Item } from "@/components/Slider/types/item";

/**
 * *MOCK DATA HELPERS
 */
const genres = [
  "Comedy",
  "Thriller",
  "Action",
  "Horror",
  "Dark",
  "Suspenseful",
];

const generateMovies = (count: number): Item[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `${i + 1}`,
    imageUrl: `/images/covers/cover-${Math.floor(Math.random() * 38) + 1}.jpg`,
    genres: genres
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 6) + 1),
    duration: "1h 24m",
  }));
};

const data = [
  {
    id: 0,
    title: "Catch Up on Unwatched Episodes",
    items: generateMovies(Math.floor(Math.random() * (30 - 15 + 1) + 15)),
  },
  {
    id: 1,
    title: "We Think You’ll Love These",
    items: generateMovies(Math.floor(Math.random() * (30 - 15 + 1) + 15)),
  },
  {
    id: 2,
    title: "Your Next Watch",
    items: generateMovies(Math.floor(Math.random() * (30 - 15 + 1) + 15)),
  },
  {
    id: 3,
    title: "Bingeworthy TV Shows",
    items: generateMovies(Math.floor(Math.random() * (30 - 15 + 1) + 15)),
  },
  {
    id: 4,
    title: "Top 10 TV Shows in the Netherlands Today",
    items: generateMovies(Math.floor(Math.random() * (30 - 15 + 1) + 15)),
  },
  {
    id: 5,
    title: "Today's Top Picks for You",
    items: generateMovies(Math.floor(Math.random() * (30 - 15 + 1) + 15)),
  },
];

export default function Page() {
  return (
    <main className="relative bg-gradient-to-b pb-24">
      <Header />

      <Hero />

      <div className="relative flex flex-col gap-[3vw] -mt-[10dvh]">
        {data.map((slider) => (
          <div key={slider.id}>
            <div className="ml-[--page-padding]">
              <h2 className="slider-title-sm md:text-slider-title-base mb-[0.5em] text-white/94">
                {slider.title}
              </h2>
            </div>

            <Slider items={slider.items} />
          </div>
        ))}
      </div>
    </main>
  );
}
