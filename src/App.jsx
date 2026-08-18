import React from 'react';
import './index.css';
import logo from './assets/logo.png';

// Import all installation images
import installStep1 from './assets/Untitled-1_0005_Layer 1.jpg';
import installStep2 from './assets/Untitled-1_0004_Layer 4.jpg';
import installStep3 from './assets/Untitled-1_0003_Layer 5.jpg';
import installStep4 from './assets/Untitled-1_0002_Layer 6.jpg';
import installStep5 from './assets/Untitled-1_0001_Layer 7.jpg';
import installStep6 from './assets/Untitled-1_0000_Layer 8.jpg';

function App() {
  const downloadLink = "https://github.com/PixelsofArya/OH-Assistant-App/releases/download/v1.0.3/OH-Assistant-Setup-1.0.3.exe";

  return (
    <div className="app-wrapper">
      
      {/* 1. CLEAN HERO VIDEO */}
      <section className="hero-clean">
        <video autoPlay loop muted playsInline className="hero-video">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="video-fade-bottom"></div>
      </section>

      {/* 2. MAIN APP CONTENT */}
      <main className="main-content">
        
        {/* DOWNLOAD DASHBOARD */}
        <section className="download-section solid-panel">
          <div className="download-header">
            <img src={logo} alt="OH Assistant Logo" className="app-logo" />
            <div className="title-group">
              <h1 className="app-title">OH Assistant</h1>
              <p className="app-subtitle">The Ultimate Desktop Companion for Once Human</p>
            </div>
          </div>
          
          <p className="download-desc">
            Never miss a loot refresh. Equip built-in timers, a clipboard manager, 
            and custom notification overlays directly on your desktop.
          </p>
          
          <div className="download-actions">
            <a href={downloadLink} className="download-btn" download="OH-Assistant-Setup-1.0.0.exe">
              Download for Windows
            </a>
            <p className="version-info">Version 1.0.0 • Clean Installation</p>
          </div>
        </section>

        {/* LARGE GRID INSTALLATION PROCESS */}
        <section className="install-section">
          <h2 className="section-title">How to Install</h2>
          
          <div className="install-grid">
            
            {/* Step 1: Cyan Border */}
            <div className="install-card solid-panel border-cyan">
              <div className="image-wrapper">
                <img src={installStep1} alt="Windows Defender Warning" />
              </div>
              <div className="card-content">
                <h3>1. Bypassing SmartScreen</h3>
                <p>Because OH Assistant is a new independent app, Windows might show a warning. Click <strong>"More info"</strong>.</p>
              </div>
            </div>

            {/* Step 2: Red Border */}
            <div className="install-card solid-panel border-red">
              <div className="image-wrapper">
                <img src={installStep2} alt="Run Anyway Button" />
              </div>
              <div className="card-content">
                <h3>2. Run Anyway</h3>
                <p>Click the <strong>"Run anyway"</strong> button at the bottom to safely launch the installer.</p>
              </div>
            </div>

            {/* Step 3: Cyan Border */}
            <div className="install-card solid-panel border-cyan">
              <div className="image-wrapper">
                <img src={installStep3} alt="Choose Install Options" />
              </div>
              <div className="card-content">
                <h3>3. Install Options</h3>
                <p>Select whether you want to install the app for all users on your PC, or just yourself, and click Next.</p>
              </div>
            </div>

            {/* Step 4: Red Border */}
            <div className="install-card solid-panel border-red">
              <div className="image-wrapper">
                <img src={installStep4} alt="Choose Location" />
              </div>
              <div className="card-content">
                <h3>4. Choose Location</h3>
                <p>Confirm the destination folder where the app will be installed, then click <strong>Install</strong>.</p>
              </div>
            </div>

            {/* Step 5: Cyan Border */}
            <div className="install-card solid-panel border-cyan">
              <div className="image-wrapper">
                <img src={installStep5} alt="Installing Progress" />
              </div>
              <div className="card-content">
                <h3>5. Installing</h3>
                <p>Wait just a few seconds while the custom setup wizard configures everything on your system.</p>
              </div>
            </div>

            {/* Step 6: Red Border */}
            <div className="install-card solid-panel border-red">
              <div className="image-wrapper">
                <img src={installStep6} alt="Installation Complete" />
              </div>
              <div className="card-content">
                <h3>6. Finish & Play</h3>
                <p>Ensure the "Run OH Assistant" box is checked, click <strong>Finish</strong>, and run the app!</p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* PROPER MULTI-COLUMN FOOTER */}
      <footer className="footer solid-panel">
        <div className="footer-grid">
          
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo-row">
              <img src={logo} alt="OH Assistant Logo" className="footer-logo" />
              <span className="footer-title">OH Assistant</span>
            </div>
            <p className="footer-desc">
              Your lightweight, frameless companion app for Once Human. Built to keep you informed without interrupting your game.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="footer-links">
            <h4>Community</h4>
            <a href="https://github.com/PixelsofArya/OH-Assistant-App" target="_blank" rel="noopener noreferrer">GitHub Repo</a>
            <a href="https://www.youtube.com/@CallMeArt91" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://www.twitch.tv/callmeart91" target="_blank" rel="noopener noreferrer">Twitch</a>
          </div>

          {/* Links Column 2 */}
          <div className="footer-links">
            <h4>Support & Dev</h4>
            
            <a href="https://guns.lol/aryadeepbarai">Bio</a>
            
            {/* Directly opens the Bug Report template */}
            <a 
              href="https://github.com/PixelsofArya/OH-Assistant-App/issues/new?template=bug_report.md" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Report a Bug
            </a>
            
            {/* Directly opens the Feature Request template */}
            <a 
              href="https://github.com/PixelsofArya/OH-Assistant-App/issues/new?template=feature_request.md" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Request a Feature
            </a>
          </div>
        </div>

        {/* Footer Bottom Divider */}
        <div className="footer-bottom">
          <p>Built by a player, for players. Made with ❤️ for the Once Human community.</p>
          <p className="disclaimer">OH Assistant is a fan-made utility and is not affiliated with, endorsed, or sponsored by Starry Studio.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;