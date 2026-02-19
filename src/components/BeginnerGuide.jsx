import SectionHeader from "../components/SectionHeader";
import VideoList from "../data/videolist";

export default function BeginnerGuide() {
  return (
    <section className="flex justify-center px-4 py-14">
      {/* GLASS BOX */}
      <div
        className="
          w-full max-w-5xl
          h-[650px] md:h-[700px]
          rounded-3xl
          bg-white/1 backdrop-blur-xl
          border border-white/10
          flex flex-col
        "
      >
        {/* HEADER (fixed, non-scroll) */}
        <SectionHeader
          title="Beginner Guides"
          subtitle="Step-by-step guides to help you get started and level up faster"
        />

        {/* VERTICAL SCROLL AREA */}
        <div
          className="
            flex-1
            overflow-y-auto
            px-4 sm:px-6 py-6
            space-y-4
            scrollbar-thin
            scrollbar-thumb-white/20
            scrollbar-track-transparent
          "
        >
          {VideoList.map((video) => {
            const videoId = video.url.split("/embed/")[1];
            const thumbnail = `https://img.youtube.com/vi/${videoId}/default.jpg`;
            const ytLink = `https://www.youtube.com/watch?v=${videoId}`;

            return (
              <a
                key={video.id}
                href={ytLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex flex-col sm:flex-row
                  gap-4
                  rounded-xl
                  p-3 sm:p-4
                  bg-black/25 hover:bg-white/10
                  transition-colors
                  group
                "
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-32 md:w-40 aspect-video flex-shrink-0 rounded-lg overflow-hidden relative">
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={video.title}
                    className="
                      absolute inset-0
                      w-full h-full
                      object-cover
                      scale-[1.15]
                    "
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center">
                  {/* Channel */}
                  <div className="flex items-center mb-2">
                    <img
                      src={video.channelAvatar}
                      alt={video.channelName}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="text-white/80 text-sm font-semibold">
                      {video.channelName}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold leading-snug">
                    {video.title}
                  </h3>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
