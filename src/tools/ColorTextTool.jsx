import { useState } from "react";

export default function ColorTextTool() {
  const [mode, setMode] = useState("single");

  // ---------- Toast ----------
  const [showCopied, setShowCopied] = useState(false);

  const triggerCopied = () => {
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 1500);
  };

  // ---------- Single ----------
  const [singleColor, setSingleColor] = useState("#ffffff");
  const [singleText, setSingleText] = useState("");

  // ---------- Multi ----------
  const [sections, setSections] = useState([
    { id: 1, color: "#ffffff", text: "" },
  ]);

  /* ---------- HELPERS ---------- */

  const encodeSingle = (text, color) =>
    text ? `#c${color.replace("#", "")}${text}` : "";

  const encodeMulti = (arr) =>
    arr
      .filter((s) => s.text)
      .map((s) => `#c${s.color.replace("#", "")}${s.text}`)
      .join("");

  const totalLengthSingle = (text) =>
    encodeSingle(text, singleColor).length;

  const totalLengthMulti = (arr) =>
    encodeMulti(arr).length;

  /* ---------- INPUT GUARDS ---------- */

  const handleSingleChange = (value) => {
    if (totalLengthSingle(value) <= 140) {
      setSingleText(value);
    }
  };

  const handleMultiChange = (id, value) => {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, text: value } : s
    );

    if (totalLengthMulti(updated) <= 140) {
      setSections(updated);
    }
  };

  /* ---------- OTHER ACTIONS ---------- */

  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now(), color: "#ffffff", text: "" },
    ]);
  };

  const updateColor = (id, value) => {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, color: value } : s
    );

    if (totalLengthMulti(updated) <= 140) {
      setSections(updated);
    }
  };

  const singleResult = encodeSingle(singleText, singleColor);
  const multiResult = encodeMulti(sections);

  const copyText = async (text) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    triggerCopied();
  };

  const resetAll = () => {
    setSingleText("");
    setSingleColor("#ffffff");
    setSections([{ id: 1, color: "#ffffff", text: "" }]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* GLASS CONTAINER */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-4">

        {/* MODE SWITCH */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode("single")}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              mode === "single"
                ? "bg-white/20"
                : "bg-white/5 hover:bg-white/10 cursor-pointer"
            }`}
          >
            Single Color
          </button>
          <button
            onClick={() => setMode("multi")}
            className={`flex-1 py-2 rounded-lg text-sm transition ${
              mode === "multi"
                ? "bg-white/20"
                : "bg-white/5 hover:bg-white/10 cursor-pointer"
            }`}
          >
            Multi Color
          </button>
        </div>

        {/* SINGLE MODE */}
        {mode === "single" && (
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={singleColor}
              onChange={(e) => {
                if (totalLengthSingle(singleText) <= 140)
                  setSingleColor(e.target.value);
              }}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={singleText}
              onChange={(e) => handleSingleChange(e.target.value)}
              placeholder="Enter text..."
              className="flex-1 bg-black/30 rounded-full px-4 py-2 text-sm outline-none"
            />
          </div>
        )}

        {/* MULTI MODE */}
        {mode === "multi" && (
          <>
            <div className="max-h-48 overflow-y-auto space-y-3">
              {sections.map((section) => (
                <div key={section.id} className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={section.color}
                    onChange={(e) =>
                      updateColor(section.id, e.target.value)
                    }
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={section.text}
                    onChange={(e) =>
                      handleMultiChange(section.id, e.target.value)
                    }
                    placeholder="Enter text..."
                    className="flex-1 bg-black/30 rounded-full px-4 py-2 text-sm outline-none"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={addSection}
              className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm cursor-pointer"
            >
              Add Color Section
            </button>
          </>
        )}

        {/* PREVIEW */}
        <div className="bg-black/30 rounded-lg p-3 h-24 overflow-y-auto text-sm whitespace-pre-wrap">
          {mode === "single" ? (
            singleText ? (
              <span style={{ color: singleColor }}>{singleText}</span>
            ) : (
              <span className="text-white/40">Preview will appear here…</span>
            )
          ) : sections.some((s) => s.text) ? (
            sections.map((s) => (
              <span key={s.id} style={{ color: s.color }}>
                {s.text}
              </span>
            ))
          ) : (
            <span className="text-white/40">Preview will appear here…</span>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3">
          <button
            onClick={resetAll}
            className="flex-1 py-2 rounded-lg bg-red-500/40 hover:bg-red-500/60 text-sm cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={() =>
              copyText(mode === "single" ? singleResult : multiResult)
            }
            className="flex-1 py-2 rounded-lg bg-green-500/40 hover:bg-green-500/60 text-sm cursor-pointer"
          >
            Copy
          </button>
        </div>
      </div>

      {/* COPY CONFIRMATION TOAST */}
      {showCopied && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md border border-white/10 text-white text-sm px-5 py-3 rounded-xl shadow-xl animate-fade-in">
            ✅ Copied to clipboard
          </div>
        </div>
      )}
    </div>
  );
}
