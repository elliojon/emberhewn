import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState({});

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
      // Replace GOOGLE_APPS_SCRIPT_URL with your deployed Google Apps Script web app URL
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
      // With no-cors mode, we can't read the response,
      // but the request still goes through. Treat as success.
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Emberhewn — Shaped by fire. Built by those who've been through it.</title>
        <meta
          name="description"
          content="A community for people navigating fertility treatment. Peer support. Shared protocols. Insurance transparency. Honest answers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Emberhewn" />
        <meta
          property="og:description"
          content="A community for people navigating fertility treatment. Shaped by fire. Built by those who've been through it."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://emberhewn.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="page-root">
        <div className="grain-overlay" />

        {/* ===== HERO ===== */}
        <section className="hero-section">
          <div className="ember-glow" />

          <div {...reveal("hero-badge", 0)}>
            <span className="label-mono accent">Coming 2026</span>
          </div>

          <div {...reveal("hero-title", 0.15)}>
            <h1 className="hero-title">
              ember<span className="accent">hewn</span>
            </h1>
          </div>

          <div {...reveal("hero-sub", 0.3)}>
            <p className="hero-subtitle">
              Shaped by fire. Built by those who&rsquo;ve been through it.
            </p>
          </div>

          <div {...reveal("hero-desc", 0.45)}>
            <p className="hero-desc">
              A community for people navigating fertility treatment.
              <br />
              Peer support. Shared protocols. Honest answers.
              <br />
              No baby dust. No gatekeeping. No bullshit.
            </p>
          </div>

          <div {...reveal("hero-cta", 0.6)}>
            <a href="#join" className="cta-btn">
              Join the Founding Community
            </a>
          </div>

          <div
            className="scroll-indicator"
            style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
          >
            <div className="scroll-line" />
            <span className="scroll-text">Scroll</span>
          </div>
        </section>

        {/* ===== PROBLEM ===== */}
        <section className="content-section">
          <div {...reveal("prob-divider", 0)}>
            <div className="divider-line" />
          </div>

          <div {...reveal("prob-header", 0.1)}>
            <span className="label-mono accent">The Problem</span>
          </div>

          <div {...reveal("prob-quote", 0.2)}>
            <blockquote className="big-quote">
              1 in 8 couples face infertility. They spend tens of thousands of
              dollars, endure months or years of treatment, and make life-altering
              decisions &mdash; with almost no structured community or transparent
              information to guide them.
            </blockquote>
          </div>

          <div {...reveal("prob-stats", 0.3)} className="stats-grid" style={reveal("prob-stats", 0.3).style}>
            {[
              {
                stat: "~40%",
                label:
                  "of patients abandon treatment before success — primarily from emotional distress",
              },
              {
                stat: "$15–20K",
                label:
                  "per IVF cycle, with almost no transparent cost data available to patients",
              },
              {
                stat: "86%",
                label:
                  "of IVF patients say injections are the most acute pain point of their journey",
              },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-number">{s.stat}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div {...reveal("prob-body", 0.4)}>
            <div className="two-col-text">
              <p>
                Right now, people in fertility treatment piece together support from
                Reddit threads, Facebook groups, and Google searches at 2am. The
                information is scattered, unstructured, and impossible to search
                when you need it most. The communities that exist are either too
                broad, too expensive, or too fragile to serve people in the thick of
                treatment.
              </p>
              <p>
                The most experienced voices &mdash; people who&rsquo;ve been through
                multiple cycles and have hard-won knowledge &mdash; get pushed out
                the moment they succeed. The community constantly hemorrhages its
                most valuable members. And the people just starting out are left to
                navigate alone, in the dark, spending real money on decisions they
                can barely understand.
              </p>
            </div>
          </div>
        </section>

        {/* ===== WHAT WE'RE BUILDING ===== */}
        <section className="content-section">
          <div {...reveal("what-divider", 0)}>
            <div className="divider-line" />
          </div>

          <div {...reveal("what-header", 0.1)}>
            <span className="label-mono accent">What We&rsquo;re Building</span>
            <h2 className="section-heading">
              A home for people in treatment.
              <br />
              <span className="muted">Not a tracking app. Not a clinic portal.</span>
            </h2>
          </div>

          <div {...reveal("what-intro", 0.2)}>
            <p className="section-intro">
              Emberhewn is a community built by people who&rsquo;ve been through
              fertility treatment &mdash; for people going through it now. We
              believe the knowledge this community generates every day is
              extraordinary. It just needs a real home.
            </p>
          </div>

          <div className="pillar-grid">
            {[
              {
                num: "01",
                title: "Journey-Matched Peers",
                body: "Automatically connected with people at your treatment stage, with your diagnosis, in your area. Small groups where you're understood, not explained.",
              },
              {
                num: "02",
                title: "The Protocol Database",
                body: "Crowdsourced, searchable treatment protocols with anonymized outcomes. What worked for people like you — structured, not buried in a forum thread.",
              },
              {
                num: "03",
                title: "Clinic Transparency",
                body: "Patient-submitted reviews of clinics and REs. Bedside manner. Billing practices. Communication quality. The Glassdoor that fertility care never had.",
              },
              {
                num: "04",
                title: "Insurance Intelligence",
                body: "Crowdsourced coverage data by carrier, plan, and employer. What was covered, what was denied, what was won on appeal. The transparency that doesn't exist anywhere.",
              },
              {
                num: "05",
                title: "Once a Member, Always",
                body: "People who've completed treatment — regardless of outcome — stay as mentors and contributors. Their experience is the community's greatest asset.",
              },
            ].map((p, i) => (
              <div key={i} {...reveal(`pillar-${i}`, 0.15 + i * 0.08)}>
                <div className="pillar-card">
                  <span className="pillar-num">{p.num}</span>
                  <h3 className="pillar-title">{p.title}</h3>
                  <p className="pillar-body">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== WHO IT'S FOR ===== */}
        <section className="content-section">
          <div {...reveal("who-divider", 0)}>
            <div className="divider-line" />
          </div>

          <div {...reveal("who-header", 0.1)}>
            <span className="label-mono accent">Who It&rsquo;s For</span>
            <h2 className="section-heading">Anyone navigating fertility treatment.</h2>
            <p className="section-intro" style={{ marginBottom: "40px" }}>
              This is not a space defined by gender, orientation, or family
              structure. It&rsquo;s defined by the experience of trying to build a
              family when biology doesn&rsquo;t cooperate.
            </p>
          </div>

          <div
            {...reveal("who-tags", 0.2)}
            className="audience-tags"
            style={reveal("who-tags", 0.2).style}
          >
            {[
              "IVF & IUI patients",
              "Egg freezing",
              "Male factor infertility",
              "LGBTQ+ family builders",
              "Donor conception",
              "Recurrent loss",
              "Partners & support people",
              "Post-treatment (any outcome)",
              "Single parents by choice",
              "Secondary infertility",
            ].map((tag, i) => (
              <span key={i} className="audience-tag">
                {tag}
              </span>
            ))}
          </div>

          <div {...reveal("who-quote", 0.3)}>
            <div className="pull-quote">
              <p className="pull-quote-text">
                &ldquo;Infertility stress is on par with a cancer diagnosis, but
                the support is dramatically lower.&rdquo;
              </p>
              <span className="pull-quote-attr">
                &mdash; Reproductive endocrinologist, r/infertility AMA
              </span>
            </div>
          </div>
        </section>

        {/* ===== JOIN ===== */}
        <section id="join" className="content-section join-section">
          <div {...reveal("join-divider", 0)}>
            <div className="divider-line" />
          </div>

          <div {...reveal("join-header", 0.1)}>
            <span className="label-mono accent">Founding Members</span>
            <h2 className="section-heading" style={{ textAlign: "center" }}>
              We&rsquo;re starting with 100 people
              <br />
              <span className="muted-italic">who&rsquo;ve been in the fire.</span>
            </h2>
          </div>

          <div {...reveal("join-body", 0.2)}>
            <p className="join-body-text">
              Emberhewn is being built by people who&rsquo;ve navigated fertility
              treatment &mdash; not by people who&rsquo;ve read about it. If
              you&rsquo;ve been through it, are going through it, or are supporting
              someone who is, we want you in the room from day one.
            </p>
          </div>

          <div {...reveal("join-form", 0.3)}>
            {!submitted ? (
              <div className="form-row">
                <input
                  type="email"
                  className="email-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                  disabled={submitting}
                />
                <button
                  className="cta-btn"
                  onClick={handleSubmit}
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.6 : 1 }}
                >
                  {submitting ? "Sending..." : "Request Early Access"}
                </button>
                {error && <div className="form-error">{error}</div>}
              </div>
            ) : (
              <div className="success-msg">
                <div className="success-title">You&rsquo;re in.</div>
                <p className="success-body">
                  We&rsquo;ll reach out when the founding community opens.
                  <br />
                  Thank you for being one of the first.
                </p>
              </div>
            )}
          </div>

          <div {...reveal("join-note", 0.45)}>
            <p className="privacy-note">
              No spam. No selling your data. Just an invitation when we&rsquo;re
              ready.
            </p>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="site-footer">
          <div className="footer-content">
            <span className="footer-name">emberhewn</span>
            <span className="footer-sep">&middot;</span>
            <span>shaped by fire, built by those who&rsquo;ve been through it</span>
            <br />
            <span>&copy; 2026</span>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: #c4713b;
          color: #1a1612;
        }

        body {
          background: #1a1612;
          color: #e8ddd0;
        }
      `}</style>

      <style jsx>{`
        .page-root {
          font-family: "Crimson Pro", "Georgia", serif;
          background: #1a1612;
          color: #e8ddd0;
          min-height: 100vh;
          overflow-x: hidden;
        }

        /* ---- Grain overlay ---- */
        .grain-overlay {
          position: fixed;
          top: -200px;
          left: -200px;
          width: calc(100% + 400px);
          height: calc(100% + 400px);
          pointer-events: none;
          z-index: 1000;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          animation: grain-drift 8s linear infinite;
        }

        @keyframes grain-drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-200px, -200px); }
        }

        @keyframes ember-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* ---- Shared elements ---- */
        .label-mono {
          font-family: "DM Mono", monospace;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 24px;
        }

        .accent {
          color: #c4713b;
        }

        .muted {
          color: rgba(232, 221, 208, 0.4);
        }

        .muted-italic {
          font-style: italic;
          color: rgba(232, 221, 208, 0.5);
        }

        .divider-line {
          width: 48px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c4713b, transparent);
          margin: 0 auto 64px;
        }

        .content-section {
          padding: 120px 24px;
          max-width: 880px;
          margin: 0 auto;
        }

        .section-heading {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 300;
          line-height: 1.3;
          margin-bottom: 20px;
        }

        .section-intro {
          font-size: 17px;
          line-height: 1.8;
          color: rgba(232, 221, 208, 0.6);
          margin-bottom: 56px;
          max-width: 640px;
        }

        /* ---- Hero ---- */
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 60px 24px;
          position: relative;
        }

        .ember-glow {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(196, 113, 59, 0.07) 0%,
            rgba(196, 113, 59, 0.02) 40%,
            transparent 70%
          );
          animation: ember-pulse 6s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-title {
          font-size: clamp(44px, 8vw, 88px);
          font-weight: 300;
          letter-spacing: -2px;
          line-height: 1.05;
          margin-bottom: 8px;
          color: #e8ddd0;
        }

        .hero-title .accent {
          font-weight: 500;
        }

        .hero-subtitle {
          font-size: clamp(16px, 2.5vw, 22px);
          font-weight: 300;
          font-style: italic;
          color: rgba(232, 221, 208, 0.6);
          max-width: 480px;
          line-height: 1.6;
          margin-top: 20px;
          margin-bottom: 48px;
        }

        .hero-desc {
          font-family: "DM Mono", monospace;
          font-size: 13px;
          line-height: 1.8;
          color: rgba(232, 221, 208, 0.45);
          max-width: 520px;
          margin-bottom: 48px;
          letter-spacing: 0.2px;
        }

        /* ---- CTA Button ---- */
        .cta-btn {
          display: inline-block;
          background: #c4713b;
          color: #1a1612;
          border: none;
          padding: 14px 32px;
          font-family: "DM Mono", monospace;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
        }

        .cta-btn:hover {
          background: #d4854f;
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(196, 113, 59, 0.25);
        }

        .cta-btn:active {
          transform: translateY(0);
        }

        /* ---- Scroll indicator ---- */
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          transition: opacity 0.3s;
          text-align: center;
        }

        .scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(180deg, rgba(232, 221, 208, 0.3) 0%, transparent 100%);
          margin: 0 auto 8px;
        }

        .scroll-text {
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(232, 221, 208, 0.25);
        }

        /* ---- Problem section ---- */
        .big-quote {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 300;
          font-style: italic;
          line-height: 1.45;
          color: #e8ddd0;
          margin-bottom: 48px;
          max-width: 720px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 32px;
          margin-bottom: 64px;
        }

        .stat-card {
          border-left: 1px solid rgba(196, 113, 59, 0.3);
          padding: 0 0 0 20px;
        }

        .stat-number {
          font-family: "DM Mono", monospace;
          font-size: 28px;
          font-weight: 500;
          color: #c4713b;
          margin-bottom: 10px;
        }

        .stat-label {
          font-family: "DM Mono", monospace;
          font-size: 12px;
          line-height: 1.6;
          color: rgba(232, 221, 208, 0.5);
        }

        .two-col-text {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          font-size: 16px;
          line-height: 1.8;
          color: rgba(232, 221, 208, 0.6);
        }

        /* ---- Pillar cards ---- */
        .pillar-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .pillar-card {
          background: rgba(232, 221, 208, 0.03);
          border: 1px solid rgba(232, 221, 208, 0.06);
          padding: 32px 28px;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pillar-card:hover {
          background: rgba(232, 221, 208, 0.05);
          border-color: rgba(196, 113, 59, 0.2);
          transform: translateY(-2px);
        }

        .pillar-num {
          font-family: "DM Mono", monospace;
          font-size: 11px;
          color: #c4713b;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 16px;
        }

        .pillar-title {
          font-size: 20px;
          font-weight: 500;
          margin-bottom: 12px;
          color: #e8ddd0;
        }

        .pillar-body {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(232, 221, 208, 0.5);
        }

        /* ---- Audience tags ---- */
        .audience-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 56px;
        }

        .audience-tag {
          display: inline-block;
          padding: 8px 16px;
          border: 1px solid rgba(232, 221, 208, 0.1);
          font-family: "DM Mono", monospace;
          font-size: 12px;
          letter-spacing: 0.5px;
          color: rgba(232, 221, 208, 0.7);
          transition: all 0.3s;
        }

        .audience-tag:hover {
          border-color: #c4713b;
          color: #c4713b;
        }

        /* ---- Pull quote ---- */
        .pull-quote {
          border-left: 1px solid rgba(196, 113, 59, 0.4);
          padding-left: 24px;
          max-width: 560px;
        }

        .pull-quote-text {
          font-size: 18px;
          font-style: italic;
          line-height: 1.7;
          color: rgba(232, 221, 208, 0.7);
          margin-bottom: 12px;
        }

        .pull-quote-attr {
          font-family: "DM Mono", monospace;
          font-size: 11px;
          color: rgba(232, 221, 208, 0.35);
          letter-spacing: 0.5px;
        }

        /* ---- Join section ---- */
        .join-section {
          text-align: center;
        }

        .join-body-text {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(232, 221, 208, 0.5);
          max-width: 520px;
          margin: 0 auto 48px;
        }

        .form-row {
          display: flex;
          gap: 12px;
          justify-content: center;
          align-items: stretch;
          flex-wrap: wrap;
          position: relative;
        }

        .email-input {
          background: rgba(232, 221, 208, 0.06);
          border: 1px solid rgba(232, 221, 208, 0.15);
          color: #e8ddd0;
          padding: 14px 20px;
          font-family: "DM Mono", monospace;
          font-size: 14px;
          width: 100%;
          max-width: 360px;
          outline: none;
          transition: all 0.3s;
        }

        .email-input:focus {
          border-color: #c4713b;
          background: rgba(232, 221, 208, 0.08);
          box-shadow: 0 0 0 3px rgba(196, 113, 59, 0.1);
        }

        .email-input::placeholder {
          color: rgba(232, 221, 208, 0.3);
        }

        .form-error {
          width: 100%;
          text-align: center;
          color: #c4713b;
          font-family: "DM Mono", monospace;
          font-size: 12px;
          margin-top: 8px;
        }

        .success-msg {
          animation: fadeIn 0.6s ease-out;
        }

        .success-title {
          font-size: 24px;
          font-weight: 300;
          margin-bottom: 12px;
          color: #c4713b;
        }

        .success-body {
          font-family: "DM Mono", monospace;
          font-size: 13px;
          color: rgba(232, 221, 208, 0.45);
          line-height: 1.7;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .privacy-note {
          font-family: "DM Mono", monospace;
          font-size: 11px;
          color: rgba(232, 221, 208, 0.2);
          margin-top: 48px;
          letter-spacing: 0.3px;
        }

        /* ---- Footer ---- */
        .site-footer {
          border-top: 1px solid rgba(232, 221, 208, 0.06);
          padding: 40px 24px;
          text-align: center;
        }

        .footer-content {
          font-family: "DM Mono", monospace;
          font-size: 11px;
          color: rgba(232, 221, 208, 0.2);
          letter-spacing: 0.5px;
          line-height: 2;
        }

        .footer-name {
          color: rgba(196, 113, 59, 0.4);
        }

        .footer-sep {
          margin: 0 12px;
        }

        /* ---- Responsive ---- */
        @media (max-width: 640px) {
          .two-col-text {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .pillar-grid {
            grid-template-columns: 1fr;
          }

          .pillar-card {
            padding: 24px 20px;
          }

          .content-section {
            padding: 80px 20px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
