import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="mt-24 px-4 pb-10">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">

        {/* TOP GRID */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-2">
              OH Assistant
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Your ultimate desktop companion app to help you survive and thrive in Once Human. 
              Lightweight, fast, and stays out of your way.
            </p>
          </div>

          {/* NAV */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-white transition cursor-pointer"
                >
                  Home / Download
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/AboutOHAssistant");
                    window.scrollTo(0, 0);
                  }}
                  className="hover:text-white transition cursor-pointer"
                >
                  About the Project
                </button>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-white font-semibold mb-3">Community & Dev</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a
                  href="https://www.youtube.com/@CallMeArt91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitch.tv/callmeart91"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Twitch
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/PixelsofArya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-6 h-px bg-white/10" />

        {/* CREATOR LINE */}
        <p className="text-center text-white/70 text-sm mb-4">
          Built by a player, for players. Made with ❤️ for the Once Human community.
        </p>

        {/* BOTTOM */}
        <div className="text-center text-white/60 text-xs space-y-2">
          <p>
            OH Assistant is a fan-made desktop utility and is not affiliated with, endorsed, 
            or sponsored by Starry Studio or Once Human.
          </p>
          <p>
            Need app support or found a bug? Contact me at{" "}
            <a
              href="mailto:aryabarai.ohassistant@gmail.com"
              className="underline hover:text-white"
            >
              aryabarai.ohassistant@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}