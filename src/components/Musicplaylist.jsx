import SectionHeader from "../components/SectionHeader";
import musicPlaylists from "../data/musicplaylist";

export default function MusicSection() {
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
          title="Music Playlists"
          subtitle="Songs and Soundtracks from Once Human"
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
          {musicPlaylists.map((playlist) => (
            <a
              key={playlist.id}
              href={playlist.url}
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
              <div className="w-full sm:w-32 md:w-40 h-48 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  className="
                    w-full h-full object-cover
                    transition-transform duration-500
                    
                  "
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Channel */}
                <div className="flex items-center mb-2">
                  <img
                    src={playlist.channelAvatar}
                    alt={playlist.channelName}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <span className="text-white/80 text-sm font-semibold">
                    {playlist.channelName}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold leading-snug">
                  {playlist.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
