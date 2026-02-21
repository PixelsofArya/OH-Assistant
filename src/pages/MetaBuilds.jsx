import { useEffect, useState } from "react";
import pdw90_1hp from "../metabuilds/PDW90_1hp_build.json";
import tec9_1hp_v1 from "../metabuilds/TEC9_1hp_v1_build.json";
import tec9_1hp_v2 from "../metabuilds/TEC9_1hp_v2_build.json";
import ebr14_octopus_1hp_v1 from "../metabuilds/EBR14-OctopusGrilledRings_1hp_v1_build.json";
import ebr14_octopus_1hp_v2 from "../metabuilds/EBR14-OctopusGrilledRings_1hp_v2_build.json";

export default function MetaBuilds() {
  const [selectedBuild, setSelectedBuild] = useState(null);
  const [builds, setBuilds] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setBuilds([
      ...pdw90_1hp,...tec9_1hp_v1,...tec9_1hp_v2,...ebr14_octopus_1hp_v1,...ebr14_octopus_1hp_v2,
    ]);
  }, []);

  const filteredBuilds = builds.filter((build) =>
    build.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="from-slate-100 to-slate-200 flex items-center justify-center pt-16 px-4">

      {/* Glass Container */}
      <div className="w-full max-w-6xl h-[75vh] bg-white/5 backdrop-blur-xl shadow-2xl border border-white/10 rounded-[32px] p-10 flex flex-col">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Meta Builds
        </h1>

        {/* Search */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search builds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md outline-none focus:ring-2 focus:ring-white/30 transition"
          />
        </div>

        {/* Scrollable Grid */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredBuilds.map((build, index) => (
              <div
                key={index}
                onClick={() => setSelectedBuild(build)}
                className="bg-white/10 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 cursor-pointer hover:-translate-y-1"
              >
                <img
                  src={build.weapons.main.image}
                  alt={build.name}
                  className="w-full h-40 object-contain mb-4 drop-shadow-md"
                />
                <h2 className="text-xl font-semibold text-center">
                  {build.name}
                </h2>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal */}
      {selectedBuild && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedBuild(null)}
        >
          <div
            className="bg-black/50 backdrop-blur-xl border border-white/15 w-full max-w-5xl h-[85vh] rounded-[28px] shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-center relative px-8 py-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-center">
                {selectedBuild.name}
              </h2>

              <button
                className="absolute right-6 text-gray-400 hover:text-white text-2xl"
                onClick={() => setSelectedBuild(null)}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-10 py-8">

              <Section title="Weapons">
                <ItemCard item={selectedBuild.weapons.main} />
                {selectedBuild.weapons.secondary.map((sec, i) => (
                  <ItemCard key={i} item={sec} />
                ))}
                <ItemCard item={selectedBuild.weapons.melee} />
              </Section>

              <Section title="Armor">
                {selectedBuild.armor.map((armor, i) => (
                  <ItemCard key={i} item={armor} />
                ))}
              </Section>

              <Section title="Mods">
                {selectedBuild.mods.map((mod, i) => (
                  <ItemCard
                    key={i}
                    item={mod}
                    extra={
                      <p className="text-xs text-white/60 mt-1">
                        {mod.slot}
                      </p>
                    }
                  />
                ))}
              </Section>

              <Section title="Calibration">
                {selectedBuild.calibration.map((cal, i) => (
                  <ItemCard
                    key={i}
                    item={cal}
                    extra={
                      <p className="text-xs text-white/60 mt-1 text-center">
                        {cal.description}
                      </p>
                    }
                  />
                ))}
              </Section>

              <Section title="Video Guides">
                {selectedBuild.videos.map((video, i) => {
                  const getYouTubeId = (url) => {
                    const regExp =
                      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
                    const match = url.match(regExp);
                    return match ? match[1] : null;
                  };

                  const videoId = getYouTubeId(video.url);
                  if (!videoId) return null;

                  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

                  return (
                    <a
                      key={i}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-64 bg-white/5 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition"
                    >
                      {/* 16:9 Thumbnail Container */}
                      <div className="w-full aspect-video overflow-hidden">
                        <img
                          src={thumbnail}
                          alt="YouTube thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-3 text-center text-sm font-medium">
                        Watch Guide
                      </div>
                    </a>
                  );
                })}
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Section */
function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-4">{children}</div>
    </div>
  );
}

/* Item Card */
function ItemCard({ item, extra }) {
  return (
    <div className="border border-white/30 bg-white/5 backdrop-blur-md rounded-xl p-4 w-36 text-center hover:shadow-lg transition">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-20 object-contain mb-2"
      />
      <p className="text-sm font-medium">{item.name}</p>
      {extra}
    </div>
  );
}
