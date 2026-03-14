import React, { useState } from "react";
import { Star, Bell } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";
import notificationBell from "../assets/NotificationBell.mp3";

const Stars = ({ count = 5 }) => (
  <div className="flex">
    {Array(count).fill(0).map((_, i) => (
      <Star key={i} className="size-4 text-transparent fill-amber-400" />
    ))}
  </div>
);

const Login = () => {
  const [showTip, setShowTip] = useState(false);

  const playSound = () => {
    const audio = new Audio(notificationBell);
    audio.volume = 0.25;
    audio.play();
  };

  const handleBellClick = () => {
    playSound();
    setShowTip(true);
    setTimeout(() => setShowTip(false), 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&display=swap');

        @keyframes floatBlob {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-20px) scale(1.05); }
          66%      { transform: translate(-20px,15px) scale(0.97); }
        }
        @keyframes slideInLeft {
          from { opacity:0; transform:translateX(-40px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity:0; transform:translateX(40px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideInUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes bellRing {
          0%,90%,100% { transform:rotate(0deg); }
          92% { transform:rotate(-15deg); }
          94% { transform:rotate(15deg); }
          96% { transform:rotate(-10deg); }
          98% { transform:rotate(10deg); }
        }
        @keyframes marqueeScroll {
          from { transform:translateX(0); }
          to   { transform:translateX(-50%); }
        }
        @keyframes shimmer {
          from { left:-100%; }
          to   { left:100%; }
        }

        .blob { position:absolute; border-radius:50%; pointer-events:none; }
        .b1 { width:400px;height:400px;background:#3B1FD4;opacity:0.26;filter:blur(90px);top:-100px;left:-100px;animation:floatBlob 8s ease-in-out 0s infinite; }
        .b2 { width:350px;height:350px;background:#1A6BCC;opacity:0.2;filter:blur(80px);top:30%;right:-70px;animation:floatBlob 8s ease-in-out 2s infinite; }
        .b3 { width:280px;height:280px;background:#0D9488;opacity:0.18;filter:blur(70px);bottom:-50px;left:35%;animation:floatBlob 8s ease-in-out 4s infinite; }
        .b4 { width:220px;height:220px;background:#7C3AED;opacity:0.22;filter:blur(70px);bottom:20%;right:20%;animation:floatBlob 8s ease-in-out 1s infinite; }

    
        .login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #050A1A;
          overflow-x: hidden;
          position: relative;
        }

      
        @media (min-width: 768px) {
          .login-page { flex-direction: row; height: 100vh; overflow: hidden; }
        }

  
        .left-panel {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.8rem 1.4rem;
          position: relative;
          z-index: 1;
          box-sizing: border-box;
          animation: slideInUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
        }
        @media (min-width: 768px) {
          .left-panel {
            width: 50%;
            padding: 2rem 2rem 2rem 5%;
            animation: slideInLeft 0.8s cubic-bezier(0.22,1,0.36,1) both;
          }
        }

    
        .right-panel {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1.4rem 2.5rem;
          position: relative;
          z-index: 1;
          box-sizing: border-box;
          animation: slideInUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }
        @media (min-width: 768px) {
          .right-panel {
            width: 50%;
            padding: 2rem;
            animation: slideInRight 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both;
          }
        }

       
        .divider {
          height: 1px;
          width: 80%;
          margin: 0 auto;
          background: linear-gradient(to right, transparent, rgba(99,102,241,0.35), transparent);
          flex-shrink: 0;
          z-index: 1;
          position: relative;
        }
        @media (min-width: 768px) {
          .divider {
            width: 1px;
            height: auto;
            margin: 2rem 0;
            background: linear-gradient(to bottom, transparent, rgba(99,102,241,0.3) 30%, rgba(56,189,248,0.2) 70%, transparent);
          }
        }

       
        .hero-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 0.5rem;
        }

        .eyebrow {
          color:#38BDF8; font-size:0.65rem; font-weight:600;
          letter-spacing:3px; text-transform:uppercase; margin-bottom:0.8rem;
          animation: fadeUp 0.6s 0.2s both;
        }

        .headline {
          font-family:'Playfair Display',serif;
          font-weight:800; line-height:1.12;
          color:#F0F4FF; margin-bottom:0.8rem;
          font-size: clamp(2.8rem, 9vw, 3rem);
          animation: fadeUp 0.6s 0.3s both;
        }
        @media (min-width: 768px) {
          .headline { font-size: clamp(3.6rem, 2.5vw, 2.5rem); }
        }

        .subtext {
          font-size:0.85rem; color:#94A3B8; max-width:320px;
          line-height:1.65;
          animation: fadeUp 0.6s 0.4s both;
        }

        .rating-row {
          display:flex; align-items:center; gap:10px; margin-top:0.9rem;
          animation: fadeUp 0.6s 0.5s both;
        }

        .pills-row {
          display:flex; flex-wrap:wrap; gap:7px; margin-top:0.9rem;
          animation: fadeUp 0.6s 0.55s both;
        }

        .pill-tag {
          display:inline-flex; align-items:center; gap:6px;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          border-radius:20px; padding:4px 12px; font-size:0.74rem; color:#94A3B8;
          cursor:default; transition:all 0.2s;
        }
        .pill-tag:hover { background:rgba(99,102,241,0.15); border-color:rgba(99,102,241,0.4); color:#A5B4FC; }

  
        .cta-row { margin-top:1rem; animation: fadeUp 0.6s 0.7s both; }

        .stay-btn {
          display:inline-flex; align-items:center; gap:10px;
          background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.35);
          color:#A5B4FC; font-size:0.88rem; font-weight:500;
          padding:10px 20px; border-radius:12px; cursor:pointer;
          transition:all 0.25s; position:relative; overflow:hidden; font-family:inherit;
        }
        .stay-btn:hover { background:rgba(99,102,241,0.2); border-color:rgba(99,102,241,0.6); transform:translateY(-1px); }
        .stay-btn::after {
          content:''; position:absolute; top:0; left:-100%; width:60%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);
          animation: shimmer 3s 1s ease-in-out infinite;
        }

        .bell-anim { animation: bellRing 3s 2s ease-in-out infinite; cursor:pointer; }
        .bell-anim:hover { color:#FBBF24; }

      
        .clerk-wrapper { width:100%; max-width:420px; }
      `}</style>

      <div className="login-page">

    
        <div style={{ position:"absolute", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
          <div className="blob b1" /><div className="blob b2" />
          <div className="blob b3" /><div className="blob b4" />
        </div>

     
        <div style={{
          position:"absolute", inset:0, zIndex:0, pointerEvents:"none",
          backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize:"60px 60px",
        }} />

    
        <div className="left-panel">


           <div style={{ display:"flex", alignItems:"center", gap:10 }}>
       
            <div style={{
              width:38, height:38, borderRadius:11, flexShrink:0,
              background:"linear-gradient(135deg,#6366F1,#0EA5E9)",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 18px rgba(99,102,241,0.45)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9"  cy="10" r="1" fill="white" stroke="none" />
                <circle cx="12" cy="10" r="1" fill="white" stroke="none" />
                <circle cx="15" cy="10" r="1" fill="white" stroke="none" />
              </svg>
            </div>
        
            <span style={{
              fontFamily:"'Playfair Display', serif",
              fontWeight:800,
              fontSize:"1.3rem",
              letterSpacing:"-0.3px",
              background:"linear-gradient(90deg, #ffffff, #A5B4FC)",
              WebkitBackgroundClip:"text",
              WebkitTextFillColor:"transparent",
            }}>
              PingPoint
            </span>
          </div>

 
          <div className="hero-section">
            <p className="eyebrow">✦ Next-Gen Messaging</p>

            <h1 className="headline">
              Talk Smarter <br />
              Respond{" "}
              <span style={{ background:"linear-gradient(90deg,#818CF8,#38BDF8,#34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Faster
              </span>
              <br />
              <span style={{
                background:"rgba(99,102,241,0.18)", border:"1px solid rgba(99,102,241,0.4)",
                borderRadius:8, padding:"0 8px", WebkitTextFillColor:"#A5B4FC",
              }}>
                Connect
              </span>{" "}
              Deeper
            </h1>

            <p className="subtext">
              Real-time, seamless communication that brings your friends &amp; family closer — visually and instantly.
            </p>

            <div className="rating-row">
              <Stars />
              <span style={{ fontSize:"0.74rem", color:"#64748B" }}>4.9 · Loved by 10k+ users</span>
            </div>

            <div className="pills-row">
              {[
                { label:"E2E Encrypted",      dot:"#34D399" },
                { label:"HD Video Calls",     dot:"#38BDF8" },
                { label:"AI-powered Replies", dot:"#A78BFA" },
              ].map(({ label, dot }) => (
                <span key={label} className="pill-tag">
                  <span style={{ width:6, height:6, borderRadius:"50%", background:dot, flexShrink:0 }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          
          <div className="cta-row">
            <button type="button" className="stay-btn">
              <span>Stay Tuned</span>
              <div style={{ position:"relative" }}>
                <Bell size={15} className="bell-anim" onClick={handleBellClick} />
                {showTip && (
                  <span style={{
                    position:"absolute", left:"50%", transform:"translateX(-50%)",
                    bottom:"calc(100% + 8px)", background:"#0F172A",
                    border:"1px solid rgba(99,102,241,0.4)", color:"#A5B4FC",
                    fontSize:"0.68rem", padding:"5px 10px", borderRadius:7, whiteSpace:"nowrap", zIndex:10,
                  }}>
                    New Features Launching Soon!
                  </span>
                )}
              </div>
            </button>
          </div>

        </div>

        <div className="divider" />

    
        <div className="right-panel">
          <div className="clerk-wrapper">
            <SignIn
              appearance={{
                elements: {
                  rootBox:                  "w-full",
                  card:                     "bg-gray-900 shadow-2xl rounded-2xl border border-indigo-500/20",
                  headerTitle:              "text-xl font-bold text-white",
                  headerSubtitle:           "text-slate-400 text-sm",
                  formFieldLabel:           "text-slate-300 text-sm",
                  formFieldInput:           "bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all",
                  formButtonPrimary:        "bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded-xl transition-all",
                  socialButtonsBlockButton: "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 rounded-xl transition-all",
                  footerActionLink:         "text-indigo-400 hover:text-indigo-300 hover:underline",
                  dividerLine:              "bg-slate-700",
                  dividerText:              "text-slate-500 text-xs",
                },
                variables: {
                  colorPrimary: "#4F46E5",
                  borderRadius: "0.75rem",
                },
              }}
            />
          </div>
        </div>

      </div>
    </>
  );
};

export default Login;
