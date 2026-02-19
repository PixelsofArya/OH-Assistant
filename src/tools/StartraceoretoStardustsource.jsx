import { useState } from "react";

export default function StartraceoretoStardustsource() {
  const [ore, setOre] = useState("");
  const [fuel, setFuel] = useState("");

  const ORE_PER = 25;
  const FUEL_PER = 15;
  const OUTPUT = 50;

  const handleOreChange = (e) => {
    setOre(e.target.value);
    setFuel("");
  };

  const handleFuelChange = (e) => {
    setFuel(e.target.value);
    setOre("");
  };

  let result = null;
  let error = null;

  if (ore) {
    const oreNum = Number(ore);
    if (oreNum < ORE_PER) {
      error = `Minimum ${ORE_PER} ore required`;
    } else {
      const runs = Math.floor(oreNum / ORE_PER);
      result = {
        fuelNeeded: runs * FUEL_PER,
        output: runs * OUTPUT,
      };
    }
  }

  if (fuel) {
    const fuelNum = Number(fuel);
    if (fuelNum < FUEL_PER) {
      error = `Minimum ${FUEL_PER} fuel required`;
    } else {
      const runs = Math.floor(fuelNum / FUEL_PER);
      result = {
        oreNeeded: runs * ORE_PER,
        output: runs * OUTPUT,
      };
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">

        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-lg font-semibold">Stardust Calculator</h2>
          <p className="text-sm text-white/60">
            Calculate stardust production from ore
          </p>
        </div>

        {/* ORE INPUT */}
        <div className="space-y-1">
          <label className="text-sm text-white/80">
            Stardust Ore Amount (25 Ore per Production)
          </label>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min={ORE_PER}
            value={ore}
            onChange={handleOreChange}
            placeholder="Enter ore amount"
            className="w-full bg-black/30 rounded-full px-4 py-2 text-sm outline-none appearance-none"
            />
        </div>

        {/* FUEL INPUT */}
        <div className="space-y-1">
          <label className="text-sm text-white/80">
            Fuel Amount (15 Fuel per Production)
          </label>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            min={FUEL_PER}
            value={fuel}
            onChange={handleFuelChange}
            placeholder="Enter fuel amount"
            className="w-full bg-black/30 rounded-full px-4 py-2 text-sm outline-none appearance-none"
            />

        </div>

        {/* PREVIEW */}
        <div className="bg-black/30 rounded-xl p-4 text-sm space-y-2">
          <p className="text-white/70 font-medium">Production Calculation:</p>

          {error && (
            <p className="text-red-400">{error}</p>
          )}

          {!error && result && (
            <>
              {result.fuelNeeded !== undefined && (
                <p>• Fuel needed: {result.fuelNeeded}</p>
              )}
              {result.oreNeeded !== undefined && (
                <p>• Ore needed: {result.oreNeeded}</p>
              )}
              <p>• Stardust produced: {result.output}</p>
            </>
          )}

          {!error && !result && (
            <p className="text-white/40">Enter ore or fuel to see result…</p>
          )}
        </div>

      </div>
    </div>
  );
}
