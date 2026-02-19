import { useEffect, useState } from "react";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTa8GhwbyRVeAjdDALbpa6ywztOxyArCLyvXKChf9KEYPSiXwTIBH37RErman5nKPZ4A5MeG14HJ9kE/pub?output=csv";

/* -------- TIME HELPER -------- */
function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (let u of units) {
    const v = Math.floor(diff / u.seconds);
    if (v >= 1) return `${v} ${u.label}${v > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

/* -------- CARD WIDTH -------- */
function getCardWidth() {
  if (window.innerWidth < 640) return 280;
  if (window.innerWidth < 1024) return 420;
  return 520;
}

export default function VideoSection() {
  const [videos, setVideos] = useState([]);
  const [active, setActive] = useState(0);
  const [cardWidth, setCardWidth] = useState(getCardWidth());

  useEffect(() => {
    const onResize = () => setCardWidth(getCardWidth());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.split("\n").slice(1);
        const data = rows
          .map((row) => {
            const [
              title,
              youtubeId,
              tag,
              channelName,
              channelAvatar,
              uploaded,
            ] = row.split(",");

            return {
              title,
              youtubeId,
              tag,
              channelName,
              channelAvatar,
              uploaded,
            };
          })
          .filter((v) => v.youtubeId)
          .reverse(); // 👈 THIS makes newest sheet rows appear first

        setVideos(data);
      });
  }, []);

  if (!videos.length) return null;

  return (
    <section className="px-4 py-14">
      {/* GLASS BOX */}
      <div className="
        mx-auto
        max-w-[95%]
        sm:max-w-3xl
        md:max-w-5xl
        lg:max-w-5xl
        rounded-3xl
        bg-white/1
        backdrop-blur-xl
        border border-white/10
        overflow-hidden
      ">


        {/* HEADER — INSIDE GLASS */}
        <header className="px-6 pt-10 pb-6 border-b border-white/10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Latest Videos Across Nalcott
          </h2>
          <p className="mt-2 max-w-2xl text-sm md:text-base text-white/60">
            Fresh builds, updates, and highlights from the community
          </p>
        </header>

        {/* CONTENT */}
        <div className="py-16">
          {/* CAROUSEL */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex items-center transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(calc(50% - ${(active + 0.5) * cardWidth
                  }px))`,
              }}
            >
              {videos.map((video, index) => {
                const distance = Math.abs(active - index);

                return (
                  <a
                    key={index}
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-4"
                    style={{
                      width: cardWidth,
                      transform: `scale(${distance === 0 ? 1 : 0.85})`,
                      opacity: distance === 0 ? 1 : 0.45,
                      filter: distance === 0 ? "none" : "blur(2px)",
                      transition: "all 0.6s ease",
                    }}
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                      {video.tag && (
                        <div className="absolute top-3 left-3 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">
                          {video.tag === "latest" && "⭐ LATEST"}
                          {video.tag === "hot" && "🔥 HOT"}
                          {video.tag === "new build" && "🏡 NEW BUILD"}
                          {video.tag === "farm build" && "🛠️ FARM BUILD"}
                        </div>
                      )}

                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                        alt={video.title}
                        className="aspect-video w-full object-cover"
                      />

                      <div className="p-4 text-center text-white">
                        <p className="font-medium line-clamp-2">
                          {video.title}
                        </p>

                        <div className="mt-2 flex items-center justify-center gap-2 text-sm text-white/60">
                          {video.channelAvatar && (
                            <img
                              src={video.channelAvatar}
                              alt={video.channelName}
                              className="w-5 h-5 rounded-full"
                            />
                          )}
                          <span>{video.channelName}</span>
                        </div>

                        {video.uploaded && (
                          <p className="mt-1 text-xs text-white/40">
                            ⏱ {timeAgo(video.uploaded)}
                          </p>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* CONTROLS */}
          <div className="mt-14 flex justify-center gap-6">
            <button
              onClick={() =>
                setActive((p) => (p === 0 ? videos.length - 1 : p - 1))
              }
              className="rounded-full bg-black/50 px-6 py-3 text-sm text-white hover:bg-white/10 border border-white/10"
            >
              ← Previous
            </button>

            <button
              onClick={() => setActive((p) => (p + 1) % videos.length)}
              className="rounded-full bg-black/50 px-6 py-3 text-sm text-white hover:bg-white/10 border border-white/10"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
