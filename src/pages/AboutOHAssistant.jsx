import creatorImg from "../assets/oh_callmeart.png";
import { useEffect } from "react";

const GlassBox = ({ children }) => (
  <div
    className="
      w-full max-w-5xl
      rounded-3xl
      bg-white/5 backdrop-blur-xl
      border border-white/10
      p-6 sm:p-10
    "
  >
    {children}
  </div>
);

const socialLinks = [
  {
    name: "YouTube",
    url: "https://www.youtube.com/@CallMeArt91",
  },
  {
    name: "Twitch",
    url: "https://www.twitch.tv/callmeart91",
  },
  // {
  //   name: "Discord",
  //   url: "https://discord.gg/YOUR_INVITE",
  // },
  // {
  //   name: "X / Twitter",
  //   url: "https://x.com/YOUR_HANDLE",
  // },
  {
    name: "GitHub",
    url: "https://github.com/PixelsofArya",
  },
];

export default function AboutOHAssistant() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex flex-col items-center gap-16 px-4 py-20">

      {/* CREATOR + STORY + VISION */}
      <GlassBox>
        {/* CREATOR */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={creatorImg}
            alt="Creator of OH Assistant"
            className="w-36 h-36 rounded-2xl object-cover border border-white/10"
          />

          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Aryadeep Barai
            </h2>
            <p className="text-white/60 mt-1">
              IGN: <span className="text-white font-medium">CallMeArt</span>
            </p>

            <p className="mt-4 max-w-xl text-white/70 leading-relaxed">
              A passionate Once Human player and content curator who loves
              breaking down mechanics, sharing smart strategies, and building
              tools that genuinely help players survive and thrive.
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-white/10" />

        {/* STORY */}
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
          The Story Behind OH Assistant
        </h3>

        <p className="text-white/70 leading-relaxed mb-4">
          The journey of OH Assistant is a bit of a silly one, but it all started with my deep love for Once Human.
          From the moment the game launched, I was hooked, I've sunk hundreds of hours into it on Steam.
        </p>

        <p className="text-white/70 leading-relaxed mb-8">
          One day, while playing, I started offering a service in-game, smelting Startrace Ore into Stardust Source.
          But there was a problem… Every time someone asked, "How much fuel do I need for this many ores?"
          or "I have this much fuel, how many ores can I smelt?", I had to open a calculator and manually do the math.
        </p>

        <p className="text-white/70 leading-relaxed mb-8">
          That’s when it hit me: Why not create a calculator that could do this instantly?
          The only issue? I didn’t know how to code.
          But since I was already into AI and automation, I turned to ChatGPT. With its help, I built my very first calculator. It worked! And it saved me (and others) a lot of time. Excited by this success, I went ahead and made another calculator for acid production.
        </p>

        <p className="text-white/70 leading-relaxed mb-8">
          Then I had another idea:
          Why not put all these tools in one place, so other players can access them too?
          So, I decided to build a website. With a few images and some basic code, I managed to get something up and running. But there was one big problem: it wasn’t responsive. I wanted to add so many features, but I just didn’t have the skills to make them happen.
        </p>

        <p className="text-white/70 leading-relaxed mb-8">
          After that i didn't make any progress. I moved on and joined new server and made some friends and they helped me but it was still incomplete. I dropped the website plan for 10 months or so, then when my domain plan is going to end like before 1 month, I rework on the website and this time i finally did it.
        </p>

        <p className="text-white/70 leading-relaxed mb-8">
          And that’s how OH Assistant was born. What started as a small personal tool has grown into a comprehensive resource for players, bringing together guides, calculators, videos, and more, all in one place!
        </p>

        {/* VISION */}
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
          Vision
        </h3>

        <p className="text-white/70 leading-relaxed">
          The vision for OH Assistant is simple — make Once Human easier to
          understand without removing the thrill of discovery.
          <br /><br />
          No clutter. No gatekeeping. Just clean tools, clear information, and
          a welcoming place for every survivor.
        </p>
      </GlassBox>

      {/* COMMUNITY + SUPPORT */}
      <GlassBox>
        {/* COMMUNITY */}
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
          Community Message
        </h3>

        <p className="text-white/70 leading-relaxed mb-8">
          Whether you’re a new survivor or a seasoned veteran, you’re part of
          this journey.
          <br /><br />
          OH Assistant grows through shared knowledge, suggestions, and the
          passion of the community. Every contribution helps shape what this
          platform becomes.
        </p>

        {/* DIVIDER */}
        <div className="my-8 h-px bg-white/10" />

        {/* SUPPORT */}
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
          Supporting OH Assistant
        </h3>

        <p className="text-white/70 leading-relaxed">
          The best way to support OH Assistant is simply by using it, sharing
          it, and helping other players discover it.
          <br /><br />
          This platform will always stay focused on helping players first.
        </p>
      </GlassBox>

      {/* SOCIAL */}
      <GlassBox>
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
          Connect With Me
        </h3>

        <div className="flex flex-wrap gap-4">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
              px-5 py-3 rounded-xl
              bg-black/30 hover:bg-white/10
              border border-white/10
              text-white/80 hover:text-white
              transition
              cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>
      </GlassBox>

    </section>
  );
}
