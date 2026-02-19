import { useState, useRef, useEffect } from "react";
import ColorTextTool from "../tools/ColorTextTool";
import StartraceoretoStardustsource from "../tools/StartraceoretoStardustsource";
import SulferchemistCalculator from "../tools/SulferchemistCalculator";

export default function Tools() {
  const [activeTool, setActiveTool] = useState("color");
  const scrollRef = useRef(null);

  useEffect(() => {
    const slider = scrollRef.current;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault(); // stop page scroll
        slider.scrollLeft += e.deltaY;
      }
    };

    if (slider) {
      slider.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (slider) {
        slider.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <section className="flex flex-col items-center pt-24 px-4 gap-8">

      {/* TOOL PICKER */}
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20"
        >
          <button
            onClick={() => setActiveTool("color")}
            className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm transition ${
              activeTool === "color"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10 cursor-pointer"
            }`}
          >
            Color Text Tool
          </button>

          <button
            onClick={() => setActiveTool("startrace")}
            className={`px-4 py-2 rounded-xl whitespace-nowrap text-sm transition ${
              activeTool === "startrace"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10 cursor-pointer"
            }`}
          >
            Startrace Ore to Stardust Source
          </button>

          <button
            onClick={() => setActiveTool("sulfer")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTool === "sulfer"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-white/70 hover:bg-white/10 cursor-pointer"
            }`}
          >
            Sulfer Chemist
          </button>

          <button
            disabled
            className="px-4 py-2 rounded-xl bg-white/5 text-white/40 text-sm cursor-not-allowed whitespace-nowrap"
          >
            More Tools Soon
          </button>
        </div>
      </div>

      {/* TOOL CONTENT */}
      <div className="w-full max-w-xl">
        <div key={activeTool} className="animate-tool">
          {activeTool === "color" && <ColorTextTool />}
          {activeTool === "startrace" && <StartraceoretoStardustsource />}
          {activeTool === "sulfer" && <SulferchemistCalculator />}
        </div>
      </div>

    </section>
  );
}
