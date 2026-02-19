import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Tools", path: "/tools" },
];

const moreItems = [
  { name: "Meta Builds", path: "/meta-builds" },
  { name: "Resource Tracker", path: "/resource-tracker" },
  // add more later here
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();
  const moreRef = useRef(null);

  useEffect(() => {
    if (open) {
      setVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (moreRef.current && !moreRef.current.contains(event.target)) {
      setMoreOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const navigateAndReload = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
    setTimeout(() => window.location.reload(), 50);
  };

  return (
    <>
      {/* STICKY NAV */}
      <header className="sticky top-0 z-50 px-4 pt-4">
        <nav className="mx-auto max-w-7xl rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between px-6 py-4">

            {/* Left — Logo */}
            <button
              onClick={() => navigateAndReload("/AboutOHAssistant")}
              className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            >
              <img
                src={logo}
                alt="OH Assistant Logo"
                className="w-9 h-9 rounded-full transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-semibold tracking-wide transition-colors duration-300 ">
                Once Human Assistant
              </span>
            </button>

            {/* DESKTOP LINKS */}
            <div className="hidden lg:flex items-center gap-2">

              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigateAndReload(item.path)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  {item.name}
                </button>
              ))}

              {/* MORE DROPDOWN */}
              <div ref={moreRef} className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  More ▾
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-2 space-y-1">
                    {moreItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigateAndReload(item.path);
                          setMoreOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white/80 hover:text-white transition"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU */}
      {visible && (
        <>
          {/* OVERLAY */}
          <div
            onClick={() => setOpen(false)}
            className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${
              open ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* GLASS DROPDOWN */}
          <div
            className={`lg:hidden fixed left-4 right-4 top-[88px] z-50
              rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10
              p-4 space-y-2 transform transition-all duration-300
              ${open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigateAndReload(item.path);
                  setOpen(false);
                }}
                className="block w-full px-4 py-3 rounded-lg text-sm text-left font-medium text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
              >
                {item.name}
              </button>
            ))}

            {/* MOBILE MORE SECTION */}
            <div className="border-t border-white/10 my-2 pt-2">
              <p className="px-4 py-2 text-xs text-white/40 uppercase">
                More
              </p>

              {moreItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigateAndReload(item.path);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-3 rounded-lg text-sm text-left font-medium text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
