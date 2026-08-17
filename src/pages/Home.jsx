import React from 'react';

const Home = () => {
  return (
    <div className="home-wrapper">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section animate-fade-slide">
        <h1 className="hero-title">
          Your Ultimate Companion for <br />
          <span className="text-gradient">Once Human</span>
        </h1>
        
        <p className="hero-subtitle">
          Never miss a loot refresh. Built-in timers, clipboard manager, and custom notification overlays—all in a lightweight, frameless desktop app that stays out of your way.
        </p>
        
        <div className="download-container">
          <button className="download-btn">Download for Windows</button>
          <p className="download-info">Version 1.0.0 • Includes Auto-Updates</p>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="content-section">
        <div className="section-header">
          <h2>Why Use OH Assistant?</h2>
          <div className="header-underline"></div>
        </div>
        
        <div className="features-grid">
          <div className="glass-box feature-card animate-fade-in">
            <h3>Timers & Trackers</h3>
            <p>Built-in loot and visional wheel timers so you never miss a refresh cycle. Always know when it's time to farm.</p>
          </div>
          
          <div className="glass-box feature-card animate-fade-in delay-100">
            <h3>Custom Overlays</h3>
            <p>Non-intrusive notifications that keep you informed without interrupting your gameplay or cluttering your screen.</p>
          </div>
          
          <div className="glass-box feature-card animate-fade-in delay-200">
            <h3>Lightweight UI</h3>
            <p>A sleek frameless interface and system tray integration. It runs quietly in the background, keeping your desktop clean.</p>
          </div>
        </div>
      </section>

      {/* 3. INSTALLATION GUIDE */}
      <section className="content-section text-center">
        <div className="section-header">
          <h2>How to Install</h2>
          <div className="header-underline"></div>
        </div>
        
        <div className="install-grid">
          <div className="install-step">
            <div className="step-number">1</div>
            <h3>Download</h3>
            <p>Grab the latest <code className="code-badge">.exe</code> installer from the top of this page.</p>
          </div>

          <div className="install-step">
            <div className="step-number">2</div>
            <h3>Run the Wizard</h3>
            <p>Open the installer. Our custom setup wizard configures everything automatically in seconds.</p>
          </div>

          <div className="install-step">
            <div className="step-number">3</div>
            <h3>Play & Update</h3>
            <p>Launch from your system tray. The app will seamlessly notify you when Discord-style auto-updates are ready!</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;