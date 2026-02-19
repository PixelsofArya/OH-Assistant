import { useState, useMemo, useRef, useEffect } from "react";
import { facilities } from "../data/ohafacilities";
import { Trash2, ChevronDown, ChevronUp, Copy } from "lucide-react";

export default function ResourceTracker() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [addedFacilities, setAddedFacilities] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter facilities
  const filteredFacilities = facilities.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add facility
  const addFacility = () => {
    const facility = facilities.find((f) => f.id === selectedId);
    if (!facility) return;

    setAddedFacilities((prev) => [
      ...prev,
      {
        ...facility,
        quantity: 1,
        instanceId: Date.now(),
        expanded: false,
      },
    ]);

    setSearch("");
    setSelectedId("");
    setOpenDropdown(false);
  };

  const changeQty = (instanceId, amount) => {
    setAddedFacilities((prev) =>
      prev.map((f) =>
        f.instanceId === instanceId
          ? { ...f, quantity: Math.max(1, f.quantity + amount) }
          : f
      )
    );
  };

  const removeFacility = (instanceId) => {
    setAddedFacilities((prev) =>
      prev.filter((f) => f.instanceId !== instanceId)
    );
  };

  const toggleExpand = (instanceId) => {
    setAddedFacilities((prev) =>
      prev.map((f) =>
        f.instanceId === instanceId
          ? { ...f, expanded: !f.expanded }
          : f
      )
    );
  };

  // TOTAL MATERIAL CALCULATION
  const totalMaterials = useMemo(() => {
    const totals = {};

    addedFacilities.forEach((facility) => {
      facility.Materials.forEach((mat) => {
        if (!totals[mat.name]) {
          totals[mat.name] = { ...mat, total: 0 };
        }
        totals[mat.name].total += mat.amount * facility.quantity;
      });
    });

    return Object.values(totals);
  }, [addedFacilities]);

  // COPY FUNCTION (no browser alert)
  const copyMaterials = async () => {
    if (!totalMaterials.length) return;

    const text =
      "Total Materials Needed:\n\n" +
      totalMaterials
        .map((mat) => `${mat.name} x ${mat.total}`)
        .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // CLEAR ALL (double-click confirm, no popup)
  const clearAllFacilities = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 2000);
      return;
    }

    setAddedFacilities([]);
    setConfirmClear(false);
  };

  return (
    <section className="flex justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 space-y-6">

        <h1 className="text-xl text-white font-semibold text-center">
          Resource Tracker
        </h1>

        {/* SEARCHABLE DROPDOWN */}
        <div ref={dropdownRef} className="relative bg-white/5 rounded-2xl p-3">
          <input
            type="text"
            placeholder="Search facility..."
            value={search}
            onFocus={() => setOpenDropdown(true)}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 text-white text-sm px-4 py-2 rounded-xl outline-none"
          />

          {openDropdown && (
            <div className="absolute mt-2 w-full max-h-40 overflow-y-auto bg-black/90 backdrop-blur-lg rounded-xl border border-white/10 z-20">
              {filteredFacilities.map((f) => (
                <div
                  key={f.id}
                  onClick={() => {
                    setSelectedId(f.id);
                    setSearch(f.name);
                    setOpenDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-white hover:bg-white/10 cursor-pointer"
                >
                  {f.name}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={addFacility}
            className="mt-3 w-full bg-white/20 hover:bg-white/30 text-white text-sm py-2 rounded-xl transition"
          >
            Add Facility
          </button>
        </div>

        {/* ADDED FACILITIES */}
        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
          {addedFacilities.map((facility) => (
            <div
              key={facility.instanceId}
              className="bg-white/10 rounded-2xl p-3 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                  onClick={() => toggleExpand(facility.instanceId)}
                >
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-10 h-10 object-contain flex-shrink-0"
                  />

                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <h2 className="text-white text-sm font-medium truncate">
                      {facility.name}
                    </h2>

                    {facility.expanded ? (
                      <ChevronUp size={16} className="text-white/70 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={16} className="text-white/70 flex-shrink-0" />
                    )}
                  </div>
                </div>

                <button
                  onClick={() => removeFacility(facility.instanceId)}
                  className="ml-3 text-white/50 hover:text-red-500 transition flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div
                className={`grid transition-all duration-300 ease-in-out ${facility.expanded
                    ? "grid-rows-[1fr] opacity-100 mt-3"
                    : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => changeQty(facility.instanceId, -1)}
                      className="bg-white/20 px-3 py-1 rounded text-white text-sm hover:bg-white/30 transition"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={facility.quantity}
                      onChange={(e) => {
                        const value = e.target.value;

                        setAddedFacilities((prev) =>
                          prev.map((f) =>
                            f.instanceId === facility.instanceId
                              ? {
                                ...f,
                                quantity: value === "" ? "" : Number(value),
                              }
                              : f
                          )
                        );
                      }}
                      onBlur={() => {
                        setAddedFacilities((prev) =>
                          prev.map((f) =>
                            f.instanceId === facility.instanceId
                              ? {
                                ...f,
                                quantity:
                                  f.quantity === "" || f.quantity < 1
                                    ? 1
                                    : Number(f.quantity),
                              }
                              : f
                          )
                        );
                      }}
                      className="w-16 text-center bg-white/10 text-white text-sm rounded px-2 py-1 outline-none"
                    />


                    <button
                      onClick={() => changeQty(facility.instanceId, 1)}
                      className="bg-white/20 px-3 py-1 rounded text-white text-sm hover:bg-white/30 transition"
                    >
                      +
                    </button>
                  </div>


                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {facility.Materials.map((mat) => (
                      <div
                        key={mat.name}
                        className="flex items-center gap-2 bg-white/5 rounded-lg p-2"
                      >
                        <img
                          src={mat.image}
                          alt={mat.name}
                          className="w-6 h-6 object-contain"
                        />
                        <div className="text-white text-xs leading-tight">
                          {mat.name}
                          <br />
                          <span className="text-white/70">
                            {mat.amount * facility.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TOTAL MATERIALS */}
        {totalMaterials.length > 0 && (
          <div className="bg-white/5 rounded-2xl p-3 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-sm font-semibold">
                Total Materials
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={copyMaterials}
                  className="flex items-center gap-2 text-xs bg-white/20 hover:bg-green-500/30 text-white px-3 py-1 rounded-lg transition"
                >
                  <Copy size={14} />
                  {copied ? "Copied ✓" : "Copy"}
                </button>

                <button
                  onClick={clearAllFacilities}
                  className={`text-xs px-3 py-1 rounded-lg transition ${confirmClear
                      ? "bg-red-600/40 text-white"
                      : "bg-white/20 hover:bg-red-500/30 text-white"
                    }`}
                >
                  {confirmClear ? "Click again to confirm" : "Clear All"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {totalMaterials.map((mat) => (
                <div
                  key={mat.name}
                  className="flex items-center gap-2 bg-white/10 rounded-lg p-2"
                >
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-6 h-6 object-contain"
                  />
                  <div className="text-white text-xs leading-tight">
                    {mat.name}
                    <br />
                    <span className="text-white/70">
                      {mat.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
