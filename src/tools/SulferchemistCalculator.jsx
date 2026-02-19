import { useState } from "react";

export default function SulferchemistCalculator() {
  const [acid, setAcid] = useState("");
  const [sulferOre, setSulferOre] = useState("");
  const [energyLinks, setEnergyLinks] = useState("");

  const SULFER_PER = 5;
  const ENERGY_PER = 50;

  const handleAcidChange = (e) => {
    setAcid(e.target.value);
    setSulferOre("");
    setEnergyLinks("");
  };

  const handleSulferChange = (e) => {
    setSulferOre(e.target.value);
    setAcid("");
    setEnergyLinks("");
  };

  const handleEnergyChange = (e) => {
    setEnergyLinks(e.target.value);
    setAcid("");
    setSulferOre("");
  };

  let result = null;
  let error = null;

  const filledCount =
    (acid ? 1 : 0) +
    (sulferOre ? 1 : 0) +
    (energyLinks ? 1 : 0);

  if (filledCount === 0) {
    result = null;
  } else if (filledCount > 1) {
    error = "Please fill only ONE field.";
  } else if (acid) {
    const acidVal = Number(acid);
    if (acidVal < 1) {
      error = "Minimum Acid is 1.";
    } else {
      result = {
        acid: acidVal,
        sulfer: acidVal * SULFER_PER,
        energy: acidVal * ENERGY_PER,
      };
    }
  } else if (sulferOre) {
    const sulferVal = Number(sulferOre);
    if (sulferVal < SULFER_PER) {
      error = `Minimum ${SULFER_PER} Sulfer Ore required`;
    } else {
      const acidProduced = Math.floor(sulferVal / SULFER_PER);
      result = {
        acid: acidProduced,
        sulfer: sulferVal,
        energy: acidProduced * ENERGY_PER,
      };
    }
  } else if (energyLinks) {
    const energyVal = Number(energyLinks);
    if (energyVal < ENERGY_PER) {
      error = `Minimum ${ENERGY_PER} Energy Links required`;
    } else {
      const acidProduced = Math.floor(energyVal / ENERGY_PER);
      result = {
        acid: acidProduced,
        sulfer: acidProduced * SULFER_PER,
        energy: energyVal,
      };
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4">

        {/* TITLE */}
        <div className="text-center">
          <h2 className="text-lg font-semibold">Sulfer Chemist Calculator</h2>
          <p className="text-sm text-white/60">
            5 Sulfer Ore + 50 Energy Links = 1 Acid
          </p>
        </div>

        {/* ACID INPUT */}
        <div className="space-y-1">
          <label className="text-sm text-white/80">
            Acid Amount (Minimum 1)
          </label>
          <input
            type="number"
            min="1"
            value={acid}
            onChange={handleAcidChange}
            placeholder="Enter acid amount"
            className="w-full bg-black/30 rounded-full px-4 py-2 text-sm outline-none appearance-none"
          />
        </div>

        {/* SULFER INPUT */}
        <div className="space-y-1">
          <label className="text-sm text-white/80">
            Sulfer Ore (Minimum 5)
          </label>
          <input
            type="number"
            min={SULFER_PER}
            value={sulferOre}
            onChange={handleSulferChange}
            placeholder="Enter sulfer ore"
            className="w-full bg-black/30 rounded-full px-4 py-2 text-sm outline-none appearance-none"
          />
        </div>

        {/* ENERGY INPUT */}
        <div className="space-y-1">
          <label className="text-sm text-white/80">
            Energy Links (Minimum 50)
          </label>
          <input
            type="number"
            min={ENERGY_PER}
            value={energyLinks}
            onChange={handleEnergyChange}
            placeholder="Enter energy links"
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
              <p>• Acid: {result.acid}</p>
              <p>• Sulfer Ore Required: {result.sulfer}</p>
              <p>• Energy Links Required: {result.energy}</p>
            </>
          )}

          {!error && !result && (
            <p className="text-white/40">
              Enter acid, sulfer ore, or energy links to see result…
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
