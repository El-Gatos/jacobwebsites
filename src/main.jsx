import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { Analytics } from "@vercel/analytics/react";
import "./style.css";
import "./trades.css";
import KmaComparison from "./KmaComparison";
import "./portfolio.css";
const Arrow = () => <span aria-hidden="true">↗</span>;
const projects = [
  {
    id: "kma",
    name: "KMA",
    type: "HVAC & construction",
    tag: "Independent redesign concept",
    title: "Helping visitors find the right KMA service",
    text: "A homepage direction for KMA HVAC & Construction: a clearer route to residential service and commercial inquiries.",
    detail:
      "KMA serves both homeowners and commercial clients. I gave those visitors separate routes to service requests and bids, organized the services so they’re easier to find, and made contact options more prominent. This is an independent concept, not commissioned, affiliated with, or endorsed by KMA. No business results are claimed.",
    className: "kma",
    liveUrl: "https://trade-demos-three.vercel.app/kma",
    originalUrl: "https://kmahvacandconstruction.com/",
  },
  {
    id: "beat-garden",
    name: "Beat Garden",
    type: "Interactive music tool",
    tag: "Personal project · Web Audio",
    title: "A musical garden you can play",
    text: "A browser-based sequencer where you plant sounds, shape a rhythm, and download your loop.",
    detail:
      "Beat Garden turns a 16-step sequencer into a garden of animated plants. Six sounds are synthesized in the browser, with adjustable tempo and swing, starter patterns, saved gardens, shareable links, and WAV downloads. The interface supports keyboard controls and reduced motion. This is a personal interactive project, not a client commission.",
    className: "beat-garden",
    liveUrl: "/beat-garden/",
    liveLabel: "Play Beat Garden",
  },
];
function ProjectVisual({ project }) {
  return project.id === "kma" ? (
    <div className="site-preview" aria-label="Published KMA redesign preview">
      <div className="site-preview-chrome">
        <span className="site-preview-dots" aria-hidden="true">
          ● ● ●
        </span>
        <span>trade-demos-three.vercel.app/kma</span>
      </div>
      <img
        src="/work/kma-after.jpg"
        width="1265"
        height="720"
        loading="lazy"
        alt="The published KMA homepage redesign, with its Good work. You can feel. headline"
      />
    </div>
  ) : (
    <div
      className="site-preview"
      aria-label="Beat Garden music sequencer preview"
    >
      <div className="site-preview-chrome">
        <span className="site-preview-dots" aria-hidden="true">
          ● ● ●
        </span>
        <span>jacobwebsites.com/beat-garden/</span>
      </div>
      <img
        src="/work/beat-garden.webp"
        width="835"
        height="475"
        loading="lazy"
        alt="Beat Garden’s six rows of colorful plants representing sounds in a music sequencer"
      />
    </div>
  );
}
const businesses = [
  {
    name: "HVAC",
    query: "AC repair near me",
    headline: "Local AC repair & installation",
    service: "AC repair & installation",
  },
  {
    name: "Shop",
    query: "gift shop near me",
    headline: "Gifts from independent makers",
    service: "Thoughtful gifts & everyday favorites",
  },
  {
    name: "Studio",
    query: "photographer near me",
    headline: "Photography for your business",
    service: "Portraits & brand photography",
  },
  {
    name: "Services",
    query: "cleaning service near me",
    headline: "Home & office cleaning",
    service: "Home & office cleaning",
  },
];
function CallFlow() {
  const [trade, setTrade] = useState(0);
  const t = businesses[trade];
  return (
    <aside className="call-flow" aria-label="Explore a sample business website">
      <div className="flow-meta">
        <span>How a visitor becomes a customer</span>
      </div>
      <div
        className="trade-tabs"
        role="group"
        aria-label="Choose a business type"
      >
        {businesses.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setTrade(i)}
            aria-pressed={trade === i}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="flow-stage" key={t.name}>
        <div className="search-demo">
          <span className="flow-step">1. Find your business</span>
          <div>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10" cy="10" r="6" />
              <path d="m15 15 6 6" />
            </svg>
            <span>{t.query}</span>
          </div>
        </div>
        <div className="flow-connector" aria-hidden="true">
          <svg viewBox="0 0 300 44" preserveAspectRatio="none">
            <path d="M20 0 V20 Q20 30 30 30 H270 Q280 30 280 40 V44" />
          </svg>
        </div>
        <div className="trade-demo">
          <span className="flow-step">2. Understand what you offer</span>
          <div className="demo-browser">
            <span>Your business</span>
            <span aria-hidden="true">•••</span>
          </div>
          <div className="demo-site">
            <span className="demo-location">Serving your community</span>
            <strong>{t.headline}</strong>
            <p>
              {t.service}. See what’s available and contact the team with your
              questions.
            </p>
            <span className="demo-call">Ask about availability</span>
          </div>
        </div>
        <div className="flow-result">
          <span className="phone-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="m7 3 3 5-3 2c2 4 3 5 7 7l2-3 5 3c0 3-2 4-4 4C10 21 3 14 3 7c0-2 1-4 4-4Z" />
            </svg>
          </span>
          <div>
            <span className="flow-step">3. Get in touch</span>
            <strong>Give visitors a clear way to contact you.</strong>
          </div>
        </div>
      </div>
      <p className="flow-disclaimer">
        Illustrative design demo. Not live search results or actual leads.
      </p>
    </aside>
  );
}
const CONTACT_EMAIL = "jacob@jacobwebsites.com";
const FORM_ENDPOINT = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;
const JACOB_PHOTO = "/me.JPEG";
function Portrait() {
  const [missing, setMissing] = useState(false);
  return (
    <figure className="portrait reveal">
      <div className="portrait-frame">
        {!missing && (
          <img
            src={JACOB_PHOTO}
            alt="Jacob Wainwright, web designer in SoCal"
            onError={() => setMissing(true)}
            loading="lazy"
            width="720"
            height="1081"
          />
        )}
        <span className="portrait-corner top-left" />
        <span className="portrait-corner bottom-right" />
      </div>
      <figcaption>
        <span>Jacob Wainwright</span>
        <span>SoCal</span>
      </figcaption>
    </figure>
  );
}
const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
const isAgreementPage = currentPath === "/service-agreement";
const isTermsPage = currentPath === "/terms";
const isPrivacyPage = currentPath === "/privacy";
const isLegalHubPage = currentPath === "/legal";
const isServicesPage = currentPath === "/services";
const isLegalPage =
  isAgreementPage || isTermsPage || isPrivacyPage || isLegalHubPage;
const isStandalonePage = isLegalPage || isServicesPage;
const homeSection = (hash) => (isStandalonePage ? "/" + hash : hash);

function App({ standalonePage = null }) {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "dark",
  );
  const [motionChoice, setMotionChoice] = useState(() => {
    try {
      const value = localStorage.getItem("jw-motion");
      return value === "reduce" || value === "full" ? value : null;
    } catch {
      return null;
    }
  });
  const [systemReduced, setSystemReduced] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const reducedMotion = motionChoice
    ? motionChoice === "reduce"
    : systemReduced;
  const themeTransition = useRef(null);
  const themeAnimation = useRef(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? "reduce" : "full";
    try {
      if (motionChoice) localStorage.setItem("jw-motion", motionChoice);
    } catch {}
    if (reducedMotion) {
      themeTransition.current?.skipTransition();
      themeAnimation.current?.cancel();
      document.querySelectorAll(".project-preview").forEach((card) => {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    }
  }, [reducedMotion, motionChoice]);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(null);
  const [draft, setDraft] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const dialog = useRef(null);
  const opener = useRef(null);
  const [service, setService] = useState("New website");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("jw-theme", theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    if (active) {
      dialog.current.showModal();
    } else if (dialog.current?.open) dialog.current.close();
  }, [active]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("seen");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const cards = [...document.querySelectorAll(".project-preview")];
    function move(e) {
      if (
        document.documentElement.dataset.motion === "reduce" ||
        e.pointerType !== "mouse"
      )
        return;
      const r = this.getBoundingClientRect();
      this.style.setProperty(
        "--tilt-x",
        (0.5 - (e.clientY - r.top) / r.height) * 4 + "deg",
      );
      this.style.setProperty(
        "--tilt-y",
        ((e.clientX - r.left) / r.width - 0.5) * 4 + "deg",
      );
    }
    function reset() {
      this.style.removeProperty("--tilt-x");
      this.style.removeProperty("--tilt-y");
    }
    cards.forEach((c) => {
      c.addEventListener("pointermove", move);
      c.addEventListener("pointerleave", reset);
    });
    return () =>
      cards.forEach((c) => {
        c.removeEventListener("pointermove", move);
        c.removeEventListener("pointerleave", reset);
      });
  }, []);
  function toggleTheme(event) {
    const nextTheme = theme === "dark" ? "light" : "dark";
    if (!document.startViewTransition || reducedMotion) {
      setTheme(nextTheme);
      return;
    }
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = left + width / 2,
      y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    themeTransition.current?.skipTransition();
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
      document.documentElement.dataset.theme = nextTheme;
    });
    themeTransition.current = transition;
    transition.ready
      .then(() => {
        if (document.documentElement.dataset.motion === "reduce") return;
        themeAnimation.current = document.documentElement.animate(
          {
            clipPath: [
              "circle(0px at " + x + "px " + y + "px)",
              "circle(" + radius + "px at " + x + "px " + y + "px)",
            ],
          },
          {
            duration: 650,
            easing: "cubic-bezier(.4,0,.2,1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  }
  function openProject(p, e) {
    opener.current = e.currentTarget;
    setActive(p);
  }
  function closeProject() {
    setActive(null);
    opener.current?.focus();
  }
  async function submitInquiry(e) {
    e.preventDefault();
    if (formStatus === "sending") return;
    const data = new FormData(e.currentTarget);
    const subject =
      service === "Maintenance"
        ? "Website maintenance inquiry"
        : "Free homepage mockup request";
    const text =
      subject +
      " — " +
      service +
      "\n\nName: " +
      data.get("name") +
      "\nEmail: " +
      data.get("email") +
      "\nWebsite: " +
      (data.get("website") || "Not yet") +
      "\n\n" +
      data.get("message");
    setDraft(text);
    setFormStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          service,
          name: data.get("name"),
          email: data.get("email"),
          website: data.get("website") || "Not yet",
          message: data.get("message"),
          _subject: subject + " — " + service,
          _template: "table",
          _honey: data.get("_honey") || "",
        }),
        // A slow acknowledgement does not mean FormSubmit rejected the email.
        signal: AbortSignal.timeout(60000),
      });
      const result = await response.json().catch(() => null);
      const sent =
        response.ok && (result?.success === true || result?.success === "true");
      setFormStatus(
        sent
          ? "sent"
          : result?.success === false || result?.success === "false"
            ? "failed"
            : "unconfirmed",
      );
    } catch {
      setFormStatus("unconfirmed");
    }
  }
  return (
    <>
      <div className="reading-progress" aria-hidden="true" />
      <Analytics />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a
          href={isStandalonePage ? "/" : "#main"}
          className="logo"
          aria-label="jacobwebsites. home"
        >
          jacob
          <span>
            websites<span className="logo-dot">.</span>
          </span>
        </a>
        <nav
          id="mobile-links"
          aria-label="Main navigation"
          className={menu ? "nav open" : "nav"}
        >
          <a href={homeSection("#work")} onClick={() => setMenu(false)}>
            Work
          </a>
          <a
            href="/services"
            aria-current={isServicesPage ? "page" : undefined}
            onClick={() => setMenu(false)}
          >
            Services
          </a>
          <a href={homeSection("#about")} onClick={() => setMenu(false)}>
            About
          </a>
          <a
            href="/legal"
            aria-current={isLegalHubPage ? "page" : undefined}
            onClick={() => setMenu(false)}
          >
            Legal
          </a>
          <a
            className="nav-contact"
            href={homeSection("#contact")}
            onClick={() => setMenu(false)}
          >
            Free mockup
          </a>
        </nav>
        <div className="header-tools">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
              "Switch to " + (theme === "dark" ? "light" : "dark") + " theme"
            }
          >
            <span aria-hidden="true">{theme === "dark" ? "◐" : "◑"}</span>
            <span className="theme-label">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </button>
          <button
            className="motion-toggle"
            aria-label="Reduce motion"
            aria-pressed={reducedMotion}
            title={
              reducedMotion
                ? "Reduced motion is on. Click to enable animations."
                : "Reduce motion"
            }
            onClick={() => setMotionChoice(reducedMotion ? "full" : "reduce")}
          >
            <span aria-hidden="true">{reducedMotion ? "Ⅱ" : "▷"}</span>
            <span className="motion-label">Reduce motion</span>
          </button>
          <button
            className="menu-toggle"
            aria-expanded={menu}
            aria-controls="mobile-links"
            onClick={() => setMenu(!menu)}
          >
            {menu ? "Close −" : "Menu +"}
          </button>
        </div>
      </header>
      <main id="main" className={isLegalPage ? "agreement-main" : undefined}>
        {isStandalonePage ? (
          standalonePage
        ) : (
          <>
            <section className="hero trade-hero">
              <div className="hero-kicker">
                <span>Independent web design & development · SoCal</span>
              </div>
              <div className="hero-layout">
                <div className="hero-copy">
                  <h1>
                    <span>
                      <b>GOOD WORK</b>
                    </span>
                    <span>
                      <b>DESERVES</b>
                    </span>
                    <span className="headline-accent">
                      <b>MORE CALLS.</b>
                    </span>
                  </h1>
                  <p className="hero-intro">
                    I design, build, and maintain websites for independent
                    businesses. You work directly with me throughout the
                    project.
                  </p>
                  <div className="hero-actions">
                    <a className="button primary" href="#contact">
                      Get my free mockup
                    </a>
                    <a className="text-link" href="#work">
                      See my work
                    </a>
                  </div>
                  <p className="offer-note">
                    See a homepage design for your business before committing to
                    a paid build.
                  </p>
                </div>
                <CallFlow />
              </div>
            </section>
            <section id="work" className="work section">
              <div className="section-top reveal">
                <h2>Recent work</h2>
                <p>
                  Open a project to see what I changed and why. Independent
                  redesign concepts are labeled separately from commissioned
                  work.
                </p>
              </div>
              <div className="project-grid">
                {projects.map((p) => (
                  <article
                    className={"project reveal " + p.className}
                    key={p.id}
                  >
                    <button
                      className="project-preview"
                      onClick={(e) => openProject(p, e)}
                    >
                      <div className="preview-bar" aria-hidden="true">
                        <span>{p.type}</span>
                      </div>
                      <div aria-hidden="true">
                        <ProjectVisual project={p} />
                      </div>
                      <span className="project-hint">
                        Explore project: {p.name}
                      </span>
                    </button>
                    <div className="project-caption">
                      <h3>{p.name}</h3>
                      <span>{p.tag}</span>
                    </div>
                    <p>{p.text}</p>
                    {p.liveUrl && (
                      <a
                        className="project-live-link"
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {p.liveLabel || "View live redesign"} <Arrow />
                      </a>
                    )}
                  </article>
                ))}
              </div>
              <div className="work-note">
                The KMA study is a self-initiated concept, not commissioned
                client work.
              </div>
            </section>
            <section className="services section" id="services">
              <div className="section-top reveal">
                <h2>How I can help</h2>
                <p>
                  Whether you need your first website, a rebuild, or someone to
                  keep it updated, I can help with the design and the
                  development.
                </p>
              </div>
              <div className="service-list">
                {[
                  {
                    n: "01",
                    name: "Website design",
                    sub: "Pages organized around what your customers need",
                    body: "Clear pages, your real photos, and a design that helps customers understand what you offer and why to choose your business.",
                  },
                  {
                    n: "02",
                    name: "Website development",
                    sub: "Responsive websites that work across screen sizes",
                    body: "I turn the design into a responsive website with accessible navigation, considered interactions, and clear ways for customers to get in touch.",
                  },
                  {
                    n: "03",
                    name: "Website rebuilds",
                    sub: "A new direction for an existing website",
                    body: "If your current site no longer reflects your business, I can rethink its layout, content, and contact flow. A free homepage mockup gives you a way to review the direction before a paid build.",
                  },
                  {
                    n: "04",
                    name: "Website maintenance",
                    sub: "Content changes, updates, and regular checks",
                    body: "Ongoing content changes, dependency updates, and checks on the pages and contact forms that matter. We agree on the scope and schedule for your website before starting.",
                  },
                ].map((s) => (
                  <details className="service reveal" key={s.n}>
                    <summary>
                      <h3>{s.name}</h3>
                      <span className="service-sub">{s.sub}</span>
                      <span className="plus" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <div className="service-body">
                      <p>{s.body}</p>
                    </div>
                  </details>
                ))}
              </div>
              <div className="process reveal">
                <span className="eyebrow">What happens next</span>
                {[
                  "Send me your site",
                  "See your free mockup",
                  "Choose a paid build",
                  "Refine & launch",
                ].map((s, i) => (
                  <div key={s}>
                    <small>0{i + 1}</small>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="about section" id="about">
              <Portrait />
              <div className="about-copy reveal">
                <h2>About Jacob</h2>
                <p className="large-copy">
                  I’m Jacob Wainwright. I live in SoCal, and I build websites
                  for the businesses around me.
                </p>
                <p>
                  I started this because I want to help small businesses that
                  are struggling. A lot of them do great work, but their website
                  doesn’t show it: the phone number is buried, the contact form
                  goes nowhere, or the site hasn’t changed in years. As someone
                  who's been part of small business for a long time, I
                  understand the challenges they face. That’s one of the easiest
                  problems a business can fix, so that’s where I come in.
                </p>
                <p>
                  I’m in my first year running this on my own, which means
                  you’re not one of a hundred accounts. I build every site from
                  scratch, by hand, and you talk to me directly the whole way
                  through, not an account manager or a support ticket.
                </p>
                <p>
                  After launch I stick around. If you need updates or fixes,
                  we’ll agree on what your site needs and what’s included.
                </p>
                <a className="text-link" href="#contact">
                  Tell me about your website
                </a>
              </div>
            </section>
            <section className="contact section" id="contact">
              <div className="contact-heading reveal">
                <h2>
                  See what your
                  <br />
                  <span className="offer-accent">website could be.</span>
                </h2>
                <p>
                  Send me your current site and tell me what you need. I’ll put
                  together a free homepage mockup so you can decide whether
                  you’d like to work together.
                </p>
                <div className="offer-scope">
                  <span>The free mockup includes</span>
                  <strong>A design preview of your homepage.</strong>
                  <p>
                    A full website build is a separate paid project. No
                    obligation to continue.
                  </p>
                </div>
                <p className="contact-email">
                  Rather email me directly?{" "}
                  <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>
                </p>
              </div>
              <form
                onSubmit={submitInquiry}
                className="inquiry reveal"
                onChange={() => {
                  if (["sent", "failed", "unconfirmed"].includes(formStatus)) {
                    setFormStatus("idle");
                    setDraft("");
                  }
                }}
              >
                <input
                  type="text"
                  name="_honey"
                  className="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <fieldset>
                  <legend>What does your business need?</legend>
                  <div className="service-choices">
                    {[
                      "New website",
                      "Website rebuild",
                      "Maintenance",
                      "Something else",
                    ].map((s) => (
                      <label
                        key={s}
                        className={service === s ? "choice selected" : "choice"}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={s}
                          checked={service === s}
                          onChange={() => setService(s)}
                        />
                        {s}
                        <span aria-hidden="true">
                          {service === s ? "✓" : "+"}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="form-grid">
                  <label>
                    Your name{" "}
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={100}
                      placeholder="First & last name"
                    />
                  </label>
                  <label>
                    Email address{" "}
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="you@yourbusiness.com"
                    />
                  </label>
                </div>
                <label>
                  Current website <span className="optional">(optional)</span>
                  <input
                    name="website"
                    type="url"
                    placeholder="https://yourbusiness.com"
                    maxLength={500}
                  />
                </label>
                <label>
                  Your business & what you need{" "}
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={3}
                    placeholder="e.g. A local gift shop. We want more product inquiries."
                  />
                </label>
                <button
                  className="button primary submit"
                  type="submit"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending"
                    ? "Sending…"
                    : service === "Maintenance"
                      ? "Ask about maintenance"
                      : "Get my free mockup"}{" "}
                </button>
                <p className="form-note">
                  Goes straight to my inbox at {CONTACT_EMAIL}. I’ll reply by
                  email.
                </p>
                {formStatus === "sent" && (
                  <div className="draft" role="status">
                    <strong>
                      {service === "Maintenance"
                        ? "Your maintenance inquiry was sent."
                        : "Your free mockup request was sent."}
                    </strong>
                    <p>
                      Thanks! I’ll get back to you at the email you gave me.
                    </p>
                  </div>
                )}
                {["failed", "unconfirmed"].includes(formStatus) && draft && (
                  <div className="draft" role="status">
                    <strong>
                      {formStatus === "failed"
                        ? "Your request wasn’t accepted."
                        : "We couldn’t confirm delivery."}
                    </strong>
                    <p>
                      {formStatus === "failed"
                        ? "The form service rejected this request. You can send your inquiry by email instead."
                        : "Your inquiry may still reach me. Please don’t submit it again. If you want to follow up, use the prepared email below and mention that you already submitted the form."}
                    </p>
                    <a
                      className="button"
                      href={
                        "mailto:" +
                        CONTACT_EMAIL +
                        "?subject=" +
                        encodeURIComponent(
                          service === "Maintenance"
                            ? "Website maintenance inquiry"
                            : "Free homepage mockup request",
                        ) +
                        "&body=" +
                        encodeURIComponent(draft)
                      }
                    >
                      Open email draft
                    </a>
                    <details>
                      <summary>View or copy your inquiry</summary>
                      <textarea
                        readOnly
                        aria-label="Prepared inquiry"
                        value={draft}
                        rows={7}
                      />
                    </details>
                  </div>
                )}
              </form>
            </section>
          </>
        )}
      </main>
      <footer>
        <a className="footer-logo" href={isStandalonePage ? "/" : "#main"}>
          jacobwebsites<span>.</span>
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jacob Websites</span>
          <span>Independent websites. SoCal.</span>
          <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>
          <a
            className="github-link"
            href="https://github.com/El-Gatos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.28-5.14 5.56.4.35.76 1.03.76 2.08v3.09c0 .3.21.65.77.54A11.25 11.25 0 0 0 12 .75Z"
              />
            </svg>
            GitHub <Arrow />
          </a>
          <a href="https://billing.stripe.com/p/login/3cIdR1gMp8fI27T9vWasg00">
            Manage billing
          </a>
          <a href="/legal" aria-current={isLegalHubPage ? "page" : undefined}>
            Legal
          </a>
          <a href={isStandalonePage ? "/" : "#main"}>Back to top ↑</a>
        </div>
      </footer>
      <dialog
        ref={dialog}
        onCancel={closeProject}
        onClick={(e) => {
          if (e.target === dialog.current) closeProject();
        }}
        aria-labelledby="project-title"
      >
        <div className="dialog-head">
          <span>{active?.tag}</span>
          <button onClick={closeProject} aria-label="Close project">
            Close ×
          </button>
        </div>
        {active && (
          <>
            {active.id === "kma" ? (
              <KmaComparison />
            ) : (
              <ProjectVisual project={active} />
            )}
            <div className="dialog-copy">
              <span className="eyebrow">
                {active.name} / {active.type}
              </span>
              <h2 id="project-title">{active.title}</h2>
              <p>{active.detail}</p>
              {active.liveUrl && (
                <div className="project-destinations">
                  <a
                    className="button primary"
                    href={active.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {active.liveLabel || "Open live redesign"} <Arrow />
                  </a>
                  {active.originalUrl && (
                    <a
                      className="button"
                      href={active.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit original site <Arrow />
                    </a>
                  )}
                </div>
              )}
              <button
                className="button"
                onClick={() => {
                  closeProject();
                  location.hash = "contact";
                }}
              >
                Get a free mockup for your business
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
if (isAgreementPage) {
  import("./ServiceAgreement").then(({ default: ServiceAgreement }) => {
    createRoot(document.getElementById("root")).render(
      <App standalonePage={<ServiceAgreement />} />,
    );
  });
} else if (isTermsPage) {
  import("./TermsOfUse").then(({ default: TermsOfUse }) => {
    createRoot(document.getElementById("root")).render(
      <App standalonePage={<TermsOfUse />} />,
    );
  });
} else if (isPrivacyPage) {
  import("./PrivacyPolicy").then(({ default: PrivacyPolicy }) => {
    createRoot(document.getElementById("root")).render(
      <App standalonePage={<PrivacyPolicy />} />,
    );
  });
} else if (isLegalHubPage) {
  import("./LegalHub").then(({ default: LegalHub }) => {
    createRoot(document.getElementById("root")).render(
      <App standalonePage={<LegalHub />} />,
    );
  });
} else if (isServicesPage) {
  import("./ServicesPage").then(({ default: ServicesPage }) => {
    createRoot(document.getElementById("root")).render(
      <App standalonePage={<ServicesPage />} />,
    );
  });
} else {
  createRoot(document.getElementById("root")).render(<App />);
}
