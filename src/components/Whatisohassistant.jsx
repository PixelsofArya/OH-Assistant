export default function AboutOHAssistant() {
  return (
    <section className="flex justify-center px-4 py-20">
      {/* GLASS BOX */}
      <div className="w-full max-w-5xl rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12">
        
        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-6">
          OH Assistant: Your Once Human Hub!
        </h2>

        {/* INTRO */}
        <p className="text-white/80 text-base md:text-lg leading-relaxed text-center mb-10">
          Hey there, fellow survivors! OH Assistant is your go-to spot for players
          from total newbies to battle-hardened pros. It’s a daily hub packed with
          hand-picked videos from top creators, the latest game updates, and
          everything you need to thrive in{" "}
          <span className="text-white font-semibold">Once Human</span>.
        </p>

        {/* SUB HEADING */}
        <h3 className="text-white text-xl md:text-2xl font-semibold mb-6">
          Dive into:
        </h3>

        {/* BULLET LIST */}
        <ul className="list-disc list-inside space-y-4 text-white/85 text-base md:text-lg">
          <li>
            <span className="text-white font-semibold">Beginner Guides:</span>{" "}
            Step-by-step tutorials on mechanics, combat, crafting, survival, and
            progression.
          </li>

          <li>
            <span className="text-white font-semibold">Resource Hub:</span>{" "}
            Details on classes, skills, gathering, base-building.
          </li>

          <li>
            <span className="text-white font-semibold">Pro Tips:</span> Advanced
            strategies for leveling, PvE, farming, and hidden secrets.
          </li>

          <li>
            <span className="text-white font-semibold">Video Collection:</span>{" "}
            Hand-picked YouTube tutorials, breakdowns, and playthroughs from the Once Human Creators.
          </li>
        </ul>

        {/* FOOTER LINE */}
        <p className="mt-10 text-center text-white/70 text-sm md:text-base">
          Your one-stop directory for tips, tools, updates, and a welcoming
          community — conquer{" "}
          <span className="text-white font-semibold">Once Human</span> with
          confidence! 🚀
        </p>
      </div>
    </section>
  );
}
