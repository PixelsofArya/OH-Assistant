import { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* ✅ LAZY PAGE IMPORTS */
const Home = lazy(() => import("./pages/Home"));
const Tools = lazy(() => import("./pages/Tools"));
const MetaBuilds = lazy(() => import("./pages/MetaBuilds"));
const ResourceTracker = lazy(() => import("./pages/ResourceTracker"));
const AboutOHAssistant = lazy(() => import("./pages/AboutOHAssistant"));

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

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
          {/* ✅ Suspense handles lazy loading */}
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-white">
                Loading page...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/meta-builds" element={<MetaBuilds />} />
              <Route path="/resource-tracker" element={<ResourceTracker />} />
              <Route path="/AboutOHAssistant" element={<AboutOHAssistant />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>

      {/* YOUR EXISTING OVERLAY LOADER */}
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
          preload="none"   /* ✅ prevents heavy initial load */
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