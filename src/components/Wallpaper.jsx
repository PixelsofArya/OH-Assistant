import Masonry from "react-masonry-css";
import Wallpapers from "../data/wallpapers";

export default function WallpaperSection() {
  const breakpoints = {
    default: 4,
    1280: 3,
    1024: 2,
    640: 1,
  };

  return (
    <section className="flex justify-center px-4 py-14">
      {/* GLASS BOX */}
      <div
        className="w-full max-w-5xl h-[700px]
                   rounded-3xl bg-white/1 backdrop-blur-xl
                   border border-white/10
                   flex flex-col"
      >
        {/* 🔹 HEADER (NOT SCROLLING) */}
        <div className="px-6 py-5 border-b border-white/10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Wallpapers
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-1">
            Click to view original source
          </p>
        </div>

        {/* 🔹 SCROLLABLE IMAGE AREA */}
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-6
                     scrollbar-thin scrollbar-thumb-white/20
                     scrollbar-track-transparent"
        >
          <Masonry
            breakpointCols={breakpoints}
            className="flex gap-4"
            columnClassName="flex flex-col gap-4"
          >
            {Wallpapers.map((wallpaper) => (
              <a
                key={wallpaper.id}
                href={wallpaper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden"
              >
                <img
                  src={wallpaper.img}
                  alt="Wallpaper"
                  loading="lazy"
                  className="w-full object-cover rounded-xl
                             transition-transform duration-500
                             group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-black/0
                             group-hover:bg-black/20 transition"
                />
              </a>
            ))}
          </Masonry>
        </div>
      </div>
    </section>
  );
}
