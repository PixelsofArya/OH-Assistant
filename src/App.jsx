import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Tools from "./pages/Tools";
import MetaBuilds from "./pages/MetaBuilds";
import ResourceTracker from "./pages/ResourceTracker";
import AboutOHAssistant from "./pages/AboutOHAssistant";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // adjust speed here

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {/* APP CONTENT */}
      <div
        className={`h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory flex flex-col text-white transition-opacity duration-500 ${
          loading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/meta-builds" element={<MetaBuilds />} />
            <Route path="/resource-tracker" element={<ResourceTracker />} />
            <Route path="/AboutOHAssistant" element={<AboutOHAssistant />} />
          </Routes>
        </main>

        <Footer />
      </div>

      {/* LOADER OVERLAY */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="text-white text-lg tracking-wider animate-pulse">
            Loading OH Assistant...
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      {/* GLOBAL BACKGROUND VIDEO */}
      <div className="fixed inset-0 z-[-2] overflow-hidden">
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <AppContent />
    </Router>
  );
}

export default App;
