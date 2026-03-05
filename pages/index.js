import Head from "next/head";
import { useState, useEffect } from "react";

const ACCENT = "#c4713b";
const BG = "#1a1612";
const TEXT = "#e8ddd0";
const TEXT60 = "rgba(232, 221, 208, 0.6)";
const TEXT50 = "rgba(232, 221, 208, 0.5)";
const TEXT45 = "rgba(232, 221, 208, 0.45)";
const TEXT35 = "rgba(232, 221, 208, 0.35)";
const TEXT20 = "rgba(232, 221, 208, 0.2)";
const BORDER = "rgba(232, 221, 208, 0.06)";
const BORDER_LIGHT = "rgba(232, 221, 208, 0.1)";
const BORDER_MED = "rgba(232, 221, 208, 0.15)";
const ACCENT30 = "rgba(196, 113, 59, 0.3)";
const ACCENT20 = "rgba(196, 113, 59, 0.2)";
const MONO = "'DM Mono', monospace";
const SERIF = "'Crimson Pro', 'Georgia', serif";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState({});
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [hoveredTag, setHoveredTag] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((v) => ({ ...v, [e.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const reveal = (id, delay = 0) => ({
    id,
    "data-reveal": true,
    style: {
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    },
  });

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const SCRIPT_URL = process.env.NEXT_PUBLIC_SHEET_URL;
      if (SCRIPT_URL) {
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            timestamp: new Date().toISOString(),
            source: "emberhewn.com",
          }),
        });
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const labelMono = {
    fontFamily: MONO,
    fontSize: "11px",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: ACCENT,
    display: "block",
    marginBottom: "24px",
  };

  const sectionStyle = {
    padding: "120px 24px",
    maxWidth: "880px",
    margin: "0 auto",
  };

  const dividerLine = {
    width: "48px",
    height: "1px",
    background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
    margin: "0 auto 64px",
  };

  const sectionHeading = {
    fontFamily: SERIF,
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 300,
    lineHeight: 1.3,
    marginBottom: "20px",
    color: TEXT,
  };

  const ctaBtnStyle = {
    display: "inline-block",
    background: btnHover ? "#d4854f" : ACCENT,
    color: BG,
    border: "none",
    padding: "14px 32px",
    fontFamily: MONO,
    fontSize: "13px",
    fontWeight: 500,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
    textDecoration: "none",
    transform: btnHover ? "translateY(-1px)" : "translateY(0)",
    boxShadow: btnHover ? "0 8px 32px rgba(196, 113, 59, 0.25)" : "none",
  };

  const pillars = [
    { num: "01", title: "Journey-Matched Peers", body: "Automatically connected with people at your treatment stage, with your diagnosis, in your area. Small groups where you're understood, not explained." },
    { num: "02", title: "The Protocol Database", body: "Crowdsourced, searchable treatment protocols with anonymized outcomes. What worked for people like you \u2014 structured, not buried in a forum thread." },
    { num: "03", title: "Clinic Transparency", body: "Patient-submitted reviews of clinics and REs. Bedside manner. Billing practices. Communication quality. The Glassdoor that fertility care never had." },
    { num: "04", title: "Insurance Intelligence", body: "Crowdsourced coverage data by carrier, plan, and employer. What was covered, what was denied, what was won on appeal. The transparency that doesn\u2019t exist anywhere." },
    { num: "05", title: "Once a Member, Always", body: "People who\u2019ve completed treatment \u2014 regardless of outcome \u2014 stay as mentors and contributors. Their experience is the community\u2019s greatest asset." },
  ];

  const tags = [
    "IVF & IUI patients", "Egg freezing", "Male factor infertility", "LGBTQ+ family builders",
    "Donor conception", "Recurrent loss", "Partners & support people", "Post-treatment (any outcome)",
    "Single parents by choice", "Secondary infertility",
  ];

  return (
    <>
      <Head>
        <title>Emberhewn \u2014 Shaped by fire. Built by those who have been through it.</title>
        <meta name="description" content="A community for people navigating fertility treatment. Peer support. Shared protocols. Insurance transparency. Honest answers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Emberhewn" />
        <meta property="og:description" content="A community for people navigating fertility treatment. Shaped by fire. Built by those who have been through it." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emberhewn.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body { background: ${BG}; color: ${TEXT}; }
          ::selection { background: ${ACCENT}; color: ${BG}; }
          @keyframes ember-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
          @keyframes grain-drift { 0% { transform: translate(0, 0); } 100% { transform: translate(-200px, -200px); } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
          @media (max-width: 640px) {
            .responsive-two-col { grid-template-columns: 1fr !important; gap: 24px !important; }
            .responsive-pillar-grid { grid-template-columns: 1fr !important; }
          }
        ` }} />
      </Head>

      <div style={{ fontFamily: SERIF, background: BG, color: TEXT, minHeight: "100vh", overflowX: "hidden" }}>
        {/* Grain */}
        <div style={{ position: "fixed", top: "-200px", left: "-200px", width: "calc(100% + 400px)", height: "calc(100% + 400px)", pointerEvents: "none", zIndex: 1000, opacity: 0.035, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, animation: "grain-drift 8s linear infinite" }} />

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "60px 24px", position: "relative" }}>
          <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,113,59,0.07) 0%, rgba(196,113,59,0.02) 40%, transparent 70%)", animation: "ember-pulse 6s ease-in-out infinite", pointerEvents: "none" }} />

          <div {...reveal("hero-badge", 0)}>
            <span style={{ ...labelMono, letterSpacing: "4px", marginBottom: "40px" }}>Coming 2026</span>
          </div>

          <div {...reveal("hero-title", 0.15)}>
            <h1 style={{ fontFamily: SERIF, fontSize: "clamp(44px, 8vw, 88px)", fontWeight: 300, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "8px", color: TEXT }}>
              ember<span style={{ color: ACCENT, fontWeight: 500 }}>hewn</span>
            </h1>
          </div>

          <div {...reveal("hero-sub", 0.3)}>
            <p style={{ fontFamily: SERIF, fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 300, fontStyle: "italic", color: TEXT60, maxWidth: "480px", lineHeight: 1.6, marginTop: "20px", marginBottom: "48px" }}>
              Shaped by fire. Built by those who&rsquo;ve been through it.
            </p>
          </div>

          <div {...reveal("hero-desc", 0.45)}>
            <p style={{ fontFamily: MONO, fontSize: "13px", lineHeight: 1.8, color: TEXT45, maxWidth: "520px", marginBottom: "48px", letterSpacing: "0.2px" }}>
              A community for people navigating fertility treatment.<br />
              Peer support. Shared protocols. Honest answers.<br />
              No baby dust. No gatekeeping. No bullshit.
            </p>
          </div>

          <div {...reveal("hero-cta", 0.6)}>
            <a href="#join" style={ctaBtnStyle} onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)}>
              Join the Founding Community
            </a>
          </div>

          <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", opacity: Math.max(0, 1 - scrollY / 200), transition: "opacity 0.3s", textAlign: "center" }}>
            <div style={{ width: "1px", height: "48px", background: "linear-gradient(180deg, rgba(232,221,208,0.3) 0%, transparent 100%)", margin: "0 auto 8px" }} />
            <span style={{ fontFamily: MONO, fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(232,221,208,0.25)" }}>Scroll</span>
          </div>
        </section>

        {/* PROBLEM */}
        <section style={sectionStyle}>
          <div {...reveal("prob-divider", 0)}><div style={dividerLine} /></div>
          <div {...reveal("prob-header", 0.1)}><span style={labelMono}>The Problem</span></div>

          <div {...reveal("prob-quote", 0.2)}>
            <blockquote style={{ fontFamily: SERIF, fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.45, color: TEXT, marginBottom: "48px", maxWidth: "720px" }}>
              1 in 8 couples face infertility. They spend tens of thousands of dollars, endure months or years of treatment, and make life-altering decisions &mdash; with almost no structured community or transparent information to guide them.
            </blockquote>
          </div>

          <div {...reveal("prob-stats", 0.3)} style={{ ...reveal("prob-stats", 0.3).style, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "32px", marginBottom: "64px" }}>
            {[
              { stat: "~40%", label: "of patients abandon treatment before success \u2014 primarily from emotional distress" },
              { stat: "$15\u201320K", label: "per IVF cycle, with almost no transparent cost data available to patients" },
              { stat: "86%", label: "of IVF patients say injections are the most acute pain point of their journey" },
            ].map((s, i) => (
              <div key={i} style={{ borderLeft: `1px solid ${ACCENT30}`, padding: "0 0 0 20px" }}>
                <div style={{ fontFamily: MONO, fontSize: "28px", fontWeight: 500, color: ACCENT, marginBottom: "10px" }}>{s.stat}</div>
                <div style={{ fontFamily: MONO, fontSize: "12px", lineHeight: 1.6, color: TEXT50 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div {...reveal("prob-body", 0.4)}>
            <div className="responsive-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", fontSize: "16px", lineHeight: 1.8, color: TEXT60 }}>
              <p>Right now, people in fertility treatment piece together support from Reddit threads, Facebook groups, and Google searches at 2am. The information is scattered, unstructured, and impossible to search when you need it most. The communities that exist are either too broad, too expensive, or too fragile to serve people in the thick of treatment.</p>
              <p>The most experienced voices &mdash; people who&rsquo;ve been through multiple cycles and have hard-won knowledge &mdash; get pushed out the moment they succeed. The community constantly hemorrhages its most valuable members. And the people just starting out are left to navigate alone, in the dark, spending real money on decisions they can barely understand.</p>
            </div>
          </div>
        </section>

        {/* WHAT WE'RE BUILDING */}
        <section style={sectionStyle}>
          <div {...reveal("what-divider", 0)}><div style={dividerLine} /></div>
          <div {...reveal("what-header", 0.1)}>
            <span style={labelMono}>What We&rsquo;re Building</span>
            <h2 style={{ ...sectionHeading, maxWidth: "600px" }}>
              A home for people in treatment.<br />
              <span style={{ color: "rgba(232,221,208,0.4)" }}>Not a tracking app. Not a clinic portal.</span>
            </h2>
          </div>

          <div {...reveal("what-intro", 0.2)}>
            <p style={{ fontSize: "17px", lineHeight: 1.8, color: TEXT60, marginBottom: "56px", maxWidth: "640px" }}>
              Emberhewn is a community built by people who&rsquo;ve been through fertility treatment &mdash; for people going through it now. We believe the knowledge this community generates every day is extraordinary. It just needs a real home.
            </p>
          </div>

          <div className="responsive-pillar-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {pillars.map((p, i) => (
              <div key={i} {...reveal(`pillar-${i}`, 0.15 + i * 0.08)}>
                <div
                  onMouseEnter={() => setHoveredPillar(i)}
                  onMouseLeave={() => setHoveredPillar(null)}
                  style={{
                    background: hoveredPillar === i ? "rgba(232,221,208,0.05)" : "rgba(232,221,208,0.03)",
                    border: `1px solid ${hoveredPillar === i ? ACCENT20 : BORDER}`,
                    padding: "32px 28px",
                    transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                    transform: hoveredPillar === i ? "translateY(-2px)" : "translateY(0)",
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: "11px", color: ACCENT, letterSpacing: "1px", display: "block", marginBottom: "16px" }}>{p.num}</span>
                  <h3 style={{ fontFamily: SERIF, fontSize: "20px", fontWeight: 500, marginBottom: "12px", color: TEXT }}>{p.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.7, color: TEXT50 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section style={sectionStyle}>
          <div {...reveal("who-divider", 0)}><div style={dividerLine} /></div>
          <div {...reveal("who-header", 0.1)}>
            <span style={labelMono}>Who It&rsquo;s For</span>
            <h2 style={sectionHeading}>Anyone navigating fertility treatment.</h2>
            <p style={{ fontSize: "17px", lineHeight: 1.8, color: TEXT50, marginBottom: "40px", maxWidth: "580px" }}>
              This is not a space defined by gender, orientation, or family structure. It&rsquo;s defined by the experience of trying to build a family when biology doesn&rsquo;t cooperate.
            </p>
          </div>

          <div {...reveal("who-tags", 0.2)} style={{ ...reveal("who-tags", 0.2).style, display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "56px" }}>
            {tags.map((tag, i) => (
              <span key={i} onMouseEnter={() => setHoveredTag(i)} onMouseLeave={() => setHoveredTag(null)} style={{ display: "inline-block", padding: "8px 16px", border: `1px solid ${hoveredTag === i ? ACCENT : BORDER_LIGHT}`, fontFamily: MONO, fontSize: "12px", letterSpacing: "0.5px", color: hoveredTag === i ? ACCENT : "rgba(232,221,208,0.7)", transition: "all 0.3s", cursor: "default" }}>
                {tag}
              </span>
            ))}
          </div>

          <div {...reveal("who-quote", 0.3)}>
            <div style={{ borderLeft: "1px solid rgba(196,113,59,0.4)", paddingLeft: "24px", maxWidth: "560px" }}>
              <p style={{ fontFamily: SERIF, fontSize: "18px", fontStyle: "italic", lineHeight: 1.7, color: "rgba(232,221,208,0.7)", marginBottom: "12px" }}>
                &ldquo;Infertility stress is on par with a cancer diagnosis, but the support is dramatically lower.&rdquo;
              </p>
              <span style={{ fontFamily: MONO, fontSize: "11px", color: TEXT35, letterSpacing: "0.5px" }}>
                &mdash; Reproductive endocrinologist, r/infertility AMA
              </span>
            </div>
          </div>
        </section>

        {/* JOIN */}
        <section id="join" style={{ ...sectionStyle, textAlign: "center", paddingBottom: "160px" }}>
          <div {...reveal("join-divider", 0)}><div style={dividerLine} /></div>
          <div {...reveal("join-header", 0.1)}>
            <span style={labelMono}>Founding Members</span>
            <h2 style={{ ...sectionHeading, textAlign: "center" }}>
              We&rsquo;re starting with 100 people<br />
              <span style={{ fontStyle: "italic", color: TEXT50 }}>who&rsquo;ve been in the fire.</span>
            </h2>
          </div>

          <div {...reveal("join-body", 0.2)}>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: TEXT50, maxWidth: "520px", margin: "0 auto 48px" }}>
              Emberhewn is being built by people who&rsquo;ve navigated fertility treatment &mdash; not by people who&rsquo;ve read about it. If you&rsquo;ve been through it, are going through it, or are supporting someone who is, we want you in the room from day one.
            </p>
          </div>

          <div {...reveal("join-form", 0.3)}>
            {!submitted ? (
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", alignItems: "stretch", flexWrap: "wrap" }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                  onFocus={() => setInputFocus(true)}
                  onBlur={() => setInputFocus(false)}
                  disabled={submitting}
                  style={{
                    background: inputFocus ? "rgba(232,221,208,0.08)" : "rgba(232,221,208,0.06)",
                    border: `1px solid ${inputFocus ? ACCENT : BORDER_MED}`,
                    boxShadow: inputFocus ? "0 0 0 3px rgba(196,113,59,0.1)" : "none",
                    color: TEXT, padding: "14px 20px", fontFamily: MONO, fontSize: "14px",
                    width: "100%", maxWidth: "360px", outline: "none", transition: "all 0.3s",
                  }}
                />
                <button onClick={handleSubmit} disabled={submitting} onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)} style={{ ...ctaBtnStyle, opacity: submitting ? 0.6 : 1 }}>
                  {submitting ? "Sending..." : "Request Early Access"}
                </button>
                {error && <div style={{ width: "100%", textAlign: "center", color: ACCENT, fontFamily: MONO, fontSize: "12px", marginTop: "8px" }}>{error}</div>}
              </div>
            ) : (
              <div style={{ animation: "fadeIn 0.6s ease-out" }}>
                <div style={{ fontSize: "24px", fontWeight: 300, marginBottom: "12px", color: ACCENT }}>You&rsquo;re in.</div>
                <p style={{ fontFamily: MONO, fontSize: "13px", color: TEXT45, lineHeight: 1.7 }}>
                  We&rsquo;ll reach out when the founding community opens.<br />Thank you for being one of the first.
                </p>
              </div>
            )}
          </div>

          <div {...reveal("join-note", 0.45)}>
            <p style={{ fontFamily: MONO, fontSize: "11px", color: TEXT20, marginTop: "48px", letterSpacing: "0.3px" }}>
              No spam. No selling your data. Just an invitation when we&rsquo;re ready.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "40px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: MONO, fontSize: "11px", color: TEXT20, letterSpacing: "0.5px", lineHeight: 2 }}>
            <span style={{ color: "rgba(196,113,59,0.4)" }}>emberhewn</span>
            <span style={{ margin: "0 12px" }}>&middot;</span>
            <span>shaped by fire, built by those who&rsquo;ve been through it</span>
            <br /><span>&copy; 2026</span>
          </div>
        </footer>
      </div>
    </>
  );
}
