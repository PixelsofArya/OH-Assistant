import { useState } from "react";

export default function Artofstardustdecay() {
  const [acid, setAcid] = useState("");
  const [stardust, setStardust] = useState("");

  const RATIO = 4; // 1 Acid = 4 Stardust Source

  const handleAcidChange = (e) => {
    setAcid(e.target.value);
    setStardust("");
  };

  const handleStardustChange = (e) => {
    setStardust(e.target.value);
    setAcid("");
  };

  let result = null;
  let error = null;

  // Stardust → Acid
  if (stardust) {
    const stardustNum = Number(stardust);

    if (stardustNum < RATIO) {
      error = `Minimum ${RATIO} Stardust Source required`;
    } else {
      result = {
        acidNeeded: Math.floor(stardustNum / RATIO),
      };
    }
  }

  // Acid → Stardust
  if (acid) {
    const acidNum = Number(acid);

    if (acidNum <= 0) {
      error = "Minimum 1 Acid required";
    } else {
      result = {
        stardustProduced: acidNum * RATIO,
      };
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">

        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-lg font-semibold">
            Art of Stardust Decay Calculator
          </h2>
          <p className="text-sm text-white/60">
            4 Stardust Source = 1 Acid
          </p>
        </div>

        {/* STARDUST INPUT (NOW FIRST) */}
        <div className="space-y-1">
          <label className="text-sm text-white/80">
            Stardust Source Amount
          </label>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min={RATIO}
            value={stardust}
            onChange={handleStardustChange}
            placeholder="Enter stardust amount"
            className="w-full bg-black/30 rounded-full px-4 py-2 text-sm outline-none appearance-none"
          />
        </div>

        {/* ACID INPUT (NOW SECOND) */}
        <div className="space-y-1">
          <label className="text-sm text-white/80">
            Acid Amount
          </label>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min="1"
            value={acid}
            onChange={handleAcidChange}
            placeholder="Enter acid amount"
            className="w-full bg-black/30 rounded-full px-4 py-2 text-sm outline-none appearance-none"
          />
        </div>

        {/* RESULT BOX */}
        <div className="bg-black/30 rounded-xl p-4 text-sm space-y-2">
          <p className="text-white/70 font-medium">
            Conversion Result:
          </p>

          {error && (
            <p className="text-red-400">{error}</p>
          )}

          {!error && result && (
            <>
              {result.stardustProduced !== undefined && (
                <p>• Stardust Source Required: {result.stardustProduced}</p>
              )}
              {result.acidNeeded !== undefined && (
                <p>• Acid Produced: {result.acidNeeded}</p>
              )}
            </>
          )}

          {!error && !result && (
            <p className="text-white/40">
              Enter stardust or acid to calculate…
            </p>
          )}
        </div>

      </div>
    </div>
  );
}