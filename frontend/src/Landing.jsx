import React from 'react';
import { Bot, Search, Wifi, BatteryMedium } from 'lucide-react';
import './App.css';

function Landing({ onStart }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="landing-page">
      <nav className="nav">
        {/* Split Colour Logo - Top Nav */}
        <div className="shabo-split-logo">
          <span className="sha">sha</span><span className="bo">bo</span>
          <span className="ai-dot"></span>
        </div>
        
       <div className="nav-mid">
          <div className="nav-link" onClick={() => scrollToSection('pricing')}>Pricing</div>
          <div className="nav-link" onClick={() => scrollToSection('how-it-works')}>How it works</div>
        
        </div>
        <div className="nav-cta" onClick={onStart}>Start free</div>
      </nav>

      <div className="hero">
        <h1>The interview<br/>is <em>tomorrow.</em></h1>
        <p className="hero-sub">Shabo gives you real AI feedback on every answer! Confidence score, STAR grading, and exactly what to fix.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={onStart}>Start practicing now</button>
          <button className="btn-ghost" onClick={() => scrollToSection('how-it-works')}>See how it works</button>
        </div>
        
        {/* --- THE MACBOOK WINDOW MOCKUP (REAL APP UI CLONE) --- */}
        {/* --- FULL MAC OS DESKTOP ENVIRONMENT --- */}
        <div className="mac-desktop-wrapper">
          
          {/* Menu Bar */}
          <div className="mac-menu-bar">
            <div className="mac-menu-left">
              <span className="mac-menu-item" style={{ fontSize: '15px' }}></span>
              <span className="mac-menu-item bold">Shabo</span>
              <span className="mac-menu-item">File</span>
              <span className="mac-menu-item">Edit</span>
              <span className="mac-menu-item">View</span>
              <span className="mac-menu-item">Window</span>
              <span className="mac-menu-item">Help</span>
            </div>
            <div className="mac-menu-right">
              <span className="mac-menu-item" style={{ display: 'flex', gap: '12px', opacity: 0.8 }}>
                <Search size={14} />
                <Wifi size={14} />
                <BatteryMedium size={14} />
              </span>
              <span className="mac-menu-item">Tue Apr 1  9:41 AM</span>
            </div>
          </div>

          {/* Shabo App Window */}
          <div className="product-wrap">
            <div className="winbar">
              <div className="win-controls">
                <div className="dot" style={{ background: '#ff5f57', borderColor: '#e0443e' }}></div>
                <div className="dot" style={{ background: '#febc2e', borderColor: '#d89f24' }}></div>
                <div className="dot" style={{ background: '#28c840', borderColor: '#22ab35' }}></div>
              </div>
              <div className="winbar-title">shabo — behavioral · software engineer @ google</div>
            </div>
            
            <div className="product-body" style={{ padding: '40px', background: 'rgba(19, 19, 42, 0.4)' }}>
              <div className="progress-bar" style={{ textAlign: 'left' }}>Question 2 of 5</div>
              <div className="result-card" style={{ margin: 0, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)', textAlign: 'left' }}>
                <h3 style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '22px' }}>
                  <Bot size={28} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--primary)' }} />
                  <span>"Tell me about a time you delivered under a very tight deadline."</span>
                </h3>
                <p className="user-answer" style={{ marginTop: '20px' }}>
                  <strong>You:</strong> "Our team had 48 hours after a key member dropped out. I restructured tasks immediately, took the backend myself, and we delivered on time with a 78% grade."
                </p>
                <div className="metrics-grid">
                  <div className="card">
                    <h4>Delivery</h4>
                    <p style={{ color: 'var(--success)' }}>Action-Oriented (91%)</p>
                  </div>
                  <div className="card">
                    <h4>Logic Score</h4>
                    <p style={{ color: 'var(--success)' }}>8 / 10</p>
                  </div>
                </div>
                <div className="feedback-section">
                  <p><strong>Feedback:</strong> Strong ownership language. "I restructured immediately" is exactly what interviewers want to hear.</p>
                  <p><strong>Missing STAR:</strong> Result — add the exact impact of your 78% grade.</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Dock */}
          <div className="mac-dock">
            {/* Fake Finder Icon */}
            <div className="dock-icon active" style={{ background: 'linear-gradient(180deg, #5fc9f8 0%, #147efb 100%)' }}></div>
            {/* Fake Mail Icon */}
            <div className="dock-icon" style={{ background: 'linear-gradient(180deg, #56b2f9 0%, #1765c0 100%)' }}></div>
            {/* Fake Messages Icon */}
            <div className="dock-icon" style={{ background: 'linear-gradient(180deg, #60e35b 0%, #29c024 100%)' }}></div>
            {/* Active Shabo App Icon */}
            <div className="dock-icon active" style={{ background: '#0b0b12', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="shabo-split-logo" style={{ fontSize: '18px', letterSpacing: '-1px' }}>
                <span className="sha">s</span><span className="bo">b</span>
              </div>
            </div>
            
            <div className="dock-divider"></div>
            
            {/* Trash Icon */}
            <div className="dock-icon" style={{ background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(255,255,255,0.2)' }}></div>
          </div>

        </div>
      </div>

      <div className="section" id="how-it-works">
        <div className="section-eyebrow">Four ways Shabo makes you better</div>
        <div className="section-h2">Everything your<br/>coach should tell you.</div>
        <div className="features">
          <div className="feat-row">
            <div className="feat-text">
              <h3>AI that scores your confidence, live</h3>
              <p>Shabo's custom ML model reads every sentence you write — detecting passive, hesitant language versus sharp, action-oriented answers. You see your confidence score the moment you submit.</p>
            </div>
            <div className="feat-ui">
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: "'DM Mono', monospace", marginBottom: '6px' }}>confidence classifier · running</div>
              <div style={{ fontSize: '22px', fontFamily: "'DM Mono', monospace", color: '#4ade80', fontWeight: '500' }}>91%</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>action-oriented</div>
              <div style={{ marginTop: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', padding: '10px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>"I restructured tasks immediately and took ownership of the backend."</div>
            </div>
          </div>
          
          <div className="feat-row rev">
            <div className="feat-text">
              <h3>STAR method grading</h3>
              <p>The LLM checks whether your answer covers Situation, Task, Action, and Result. You get a breakdown of exactly which elements landed and which ones you missed.</p>
            </div>
            <div className="feat-ui">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <div style={{ background: 'rgba(74,222,128,0.1)', border: '0.5px solid rgba(74,222,128,0.2)', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: '#4ade80' }}>S — Situation ✓</div>
                <div style={{ background: 'rgba(74,222,128,0.1)', border: '0.5px solid rgba(74,222,128,0.2)', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: '#4ade80' }}>T — Task ✓</div>
                <div style={{ background: 'rgba(74,222,128,0.1)', border: '0.5px solid rgba(74,222,128,0.2)', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: '#4ade80' }}>A — Action ✓</div>
                <div style={{ background: 'rgba(248,113,113,0.1)', border: '0.5px solid rgba(248,113,113,0.2)', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: '#f87171' }}>R — Result ✗</div>
              </div>
            </div>
          </div>

          <div className="feat-row">
            <div className="feat-text">
              <h3>Job description alignment</h3>
              <p>Paste the job description before your session. Shabo checks every answer against the role requirements and tells you whether your response actually speaks to what they're hiring for.</p>
            </div>
            <div className="feat-ui">
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginBottom: '8px' }}>Job: Software Engineer @ Google</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6' }}>Your answer demonstrates <span style={{ color: '#4ade80' }}>leadership</span> and <span style={{ color: '#4ade80' }}>ownership</span> — both core to Google's engineering culture. Missing: mention of <span style={{ color: '#F5A623' }}>scale</span> or <span style={{ color: '#F5A623' }}>technical impact</span>.</div>
            </div>
          </div>

          <div className="feat-row rev">
            <div className="feat-text">
              <h3>Progress analytics</h3>
              <p>Every session is tracked. See your score trend over time, your consistency, and your weakest STAR element — so you know exactly what to work on before the real interview.</p>
            </div>
            <div className="feat-ui">
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginBottom: '10px', fontFamily: "'DM Mono', monospace" }}>sessions: 4 · avg score: 7.2 · trend: ↑</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '48px' }}>
                <div style={{ flex: 1, background: 'rgba(245,166,35,0.3)', borderRadius: '3px 3px 0 0', height: '40%' }}></div>
                <div style={{ flex: 1, background: 'rgba(245,166,35,0.4)', borderRadius: '3px 3px 0 0', height: '55%' }}></div>
                <div style={{ flex: 1, background: 'rgba(245,166,35,0.6)', borderRadius: '3px 3px 0 0', height: '70%' }}></div>
                <div style={{ flex: 1, background: '#F5A623', borderRadius: '3px 3px 0 0', height: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-eyebrow">Simple by design</div>
        <div className="section-h2">Ready in <em>3 steps.</em></div>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-title">Paste the job</div>
            <div className="step-desc">Drop in the job description. Shabo calibrates every question and evaluation to that specific role.</div>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-title">Answer the questions</div>
            <div className="step-desc">Type or speak your answers. Behavioral, technical, or both — Shabo adapts to what you need.</div>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-title">Get the feedback</div>
            <div className="step-desc">Instant scores, STAR breakdown, and specific suggestions. No vague "that was good."</div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-eyebrow">The honest comparison</div>
        <div className="section-h2">Not your friend.<br/><em>Better.</em></div>
        <div className="vs-grid">
          <div className="vs-card">
            <div className="vs-tag bad">Practicing with friends</div>
            <div className="vs-item"><svg className="cross" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Vague feedback — "yeah that was good"</div>
            <div className="vs-item"><svg className="cross" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>No STAR structure check</div>
            <div className="vs-item"><svg className="cross" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>No job description alignment</div>
            <div className="vs-item"><svg className="cross" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Available only when they are</div>
          </div>
          <div className="vs-card shabo">
            <div className="vs-tag good">Shabo</div>
            <div className="vs-item good"><svg className="check" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Specific, scored feedback every time</div>
            <div className="vs-item good"><svg className="check" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Full STAR method grading</div>
            <div className="vs-item good"><svg className="check" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Calibrated to your exact job description</div>
            <div className="vs-item good"><svg className="check" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Available at midnight, always</div>
          </div>
        </div>
      </div>

      {/* --- NEW FREE PRICING SECTION --- */}
      <div className="section" id="pricing">
        <div className="section-eyebrow">Clear and simple</div>
        
        <div className="free-pricing-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <div className="shabo-split-logo" style={{ fontSize: '48px', letterSpacing: '-2px' }}>
              <span className="sha">sha</span><span className="bo">bo</span>
              <span className="ai-dot" style={{ width: '10px', height: '10px', margin: '0 4px 12px' }}></span>
            </div>
            <div className="section-h2" style={{ margin: 0 }}>is absolutely free.</div>
          </div>
          
          <p className="pricing-desc" style={{ maxWidth: '500px', margin: '0 auto 32px', fontSize: '16px', lineHeight: '1.6', color: 'rgba(255,255,255,0.6)' }}>
            No credit cards, no hidden paywalls, no premium tiers. We built this to help you land the job, not to empty your wallet. Practice as much as you need.
          </p>
          
          <button className="btn-primary" onClick={onStart}>Start practicing now</button>
        </div>
      </div>
      {/* -------------------------------- */}

      <div className="section">
        <div className="stats">
          <div className="stat"><div className="stat-num">2s</div><div className="stat-label">Average feedback time after you submit an answer</div></div>
          <div className="stat"><div className="stat-num">4</div><div className="stat-label">Dimensions scored — confidence, STAR, job fit, overall</div></div>
          <div className="stat"><div className="stat-num">∞</div><div className="stat-label">Sessions. Practice as many times as you need. Always free to start.</div></div>
        </div>
      </div>

      <div className="final-cta">
        <div className="final-h2">Interview AI that helps<br/>before the call, not <em>after.</em></div>
        <div className="final-sub">Practice tonight. Walk in sharp tomorrow.</div>
        <button className="btn-primary" onClick={onStart}>Start practicing now</button>
      </div>

      <div className="footer">
        <div className="footer-logo-wrap">
          {/* Split Colour Logo - Footer */}
          <div className="shabo-split-logo">
            <span className="sha">sha</span><span className="bo">bo</span>
            <span className="ai-dot"></span>
          </div>
          
          {/* NEW TAGLINE */}
          <div className="footer-tagline">Make we do am Shabo-shabo!</div>
        </div>
        <div>
          <div className="footer-col-title">Product</div>
          <div className="footer-link" onClick={() => scrollToSection('how-it-works')}>How it works</div>
          <div className="footer-link" onClick={() => scrollToSection('pricing')}>Pricing</div>
          
        </div>
        <div>
          <div className="footer-col-title">Support</div>
          <div className="footer-link">Help center</div>
          <div className="footer-link">Contact us</div>
        </div>
        <div>
          <div className="footer-col-title">Legal</div>
          <div className="footer-link">Privacy policy</div>
          <div className="footer-link">Terms of service</div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-copy">© 2026 Shabo. All rights reserved.</div>
        <div className="footer-copy">Built just for you.</div>
      </div>
    </div>
  );
}

export default Landing;