import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import VideoSection from "../components/VideoSection";
import BeginnerGuide from "../components/BeginnerGuide";
import Musicplaylist from "../components/Musicplaylist";
import WallpaperSection from "../components/Wallpaper";
import WhatisOHAssistant from "../components/Whatisohassistant";

export default function Home() {
  const beginnerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "beginner") {
      setTimeout(() => {
        beginnerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [location]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen w-full flex items-center justify-center">
        <h3 className="absolute top-16 text-white font-bold tracking-widest text-lg animate-bounce [animation-duration:2s]">
          WELCOME METAS!
        </h3>

        <div className="absolute bottom-24">
          <ChevronDown className="h-8 w-8 animate-bounce text-white opacity-80" />
        </div>
      </section>

      <VideoSection />

      {/* 👇 TARGET SECTION */}
      <div ref={beginnerRef}>
        <BeginnerGuide />
      </div>

      <Musicplaylist />
      <WallpaperSection />
      <WhatisOHAssistant />
    </>
  );
}
