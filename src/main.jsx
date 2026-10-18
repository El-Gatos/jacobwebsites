import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import "./style.css";
import "./trades.css";
const Arrow = ({ diagonal = false }) => (
  <span aria-hidden="true">{diagonal ? "↗" : "↗"}</span>
);
const projects = [
  {
    id: "kma",
    name: "KMA",
    type: "HVAC & construction",
    tag: "Independent redesign concept",
    title: "Built for the people who build.",
    text: "A homepage direction for KMA HVAC & Construction: a clearer route to residential service and commercial inquiries.",
    detail:
      "This self-initiated design study explores a stronger service hierarchy, separate residential and commercial calls to action, and a direct path to contact. It is not commissioned, affiliated with, or endorsed by KMA. No business results are claimed.",
    className: "kma",
  },
  {
    id: "jacob",
    name: "Jacob Websites",
    type: "Design & development",
    tag: "Own business · Website",
    title: "A little less expected.",
    text: "The site you’re on. Built to explain the offer clearly and make requesting a free mockup straightforward.",
    detail:
      "An editorial layout, a persistent accessible theme switch, responsive typography, and a lightweight React implementation. This is my own business website, not a client commission.",
    className: "jacob",
  },
];
function ProjectVisual({ project }) {
  return project.id === "kma" ? (
    <div className="mock kma-mock" aria-label="KMA concept preview">
      <div className="mock-nav">
        <b>
          KMA<span> HVAC + CONSTRUCTION</span>
        </b>
        <span>BUILT ON TRUST. ↗</span>
      </div>
      <div className="mock-content">
        <small>RESIDENTIAL / COMMERCIAL</small>
        <strong>
          COMFORT.
          <br />
          WITHOUT
          <br />
          <em>COMPROMISE.</em>
        </strong>
        <span className="mock-cta">LET’S GET TO WORK ↗</span>
      </div>
      <div className="machine" aria-hidden="true">
        <div className="fan" />
        <span>KMA / SYSTEM 01</span>
      </div>
      <div className="mock-foot">
        HEATING & COOLING <span>CONSTRUCTION & MORE ↗</span>
      </div>
    </div>
  ) : (
    <div className="mock own-mock" aria-label="Jacob Websites identity study">
      <span className="own-top">
        INDEPENDENT BY DESIGN. <span>EST. NOW.</span>
      </span>
      <div className="own-word">
        jacob<span>websites</span>
        <i>↗</i>
      </div>
      <div className="own-bottom">
        <span>
          GOOD BUSINESS.
          <br />
          BETTER FIRST IMPRESSION.
        </span>
        <span className="own-mark">jw.</span>
      </div>
    </div>
  );
}
const trades = [
  {
    name: "HVAC",
    query: "AC repair Moreno Valley",
    headline: "Cool air. Clear answers.",
    service: "AC repair & installation",
  },
  {
    name: "Plumbing",
    query: "plumber Moreno Valley",
    headline: "The leak stops here.",
    service: "Plumbing & drain services",
  },
  {
    name: "Electrical",
    query: "electrician Moreno Valley",
    headline: "Good work. Wired in.",
    service: "Electrical repairs & upgrades",
  },
  {
    name: "Contracting",
    query: "contractor Moreno Valley",
    headline: "Your next project starts here.",
    service: "Home improvements & construction",
  },
];
function CallFlow() {
  const [trade, setTrade] = useState(0);
  const t = trades[trade];
  return (
    <aside className="call-flow" aria-label="Explore a sample trade website">
      <div className="flow-meta">
        <span>THE JOB OF YOUR WEBSITE</span>
        <span aria-hidden="true">↘</span>
      </div>
      <div className="trade-tabs" role="group" aria-label="Choose a trade">
        {trades.map((item, i) => (
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
          <span className="flow-step">01 / GET FOUND</span>
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
          <span>MAKE A STRONG FIRST IMPRESSION</span>
        </div>
        <div className="trade-demo">
          <span className="flow-step">02 / BUILD TRUST</span>
          <div className="demo-browser">
            <span>YOUR BUSINESS</span>
            <span aria-hidden="true">•••</span>
          </div>
          <div className="demo-site">
            <span className="demo-location">
              MORENO VALLEY & SURROUNDING AREAS
            </span>
            <strong>{t.headline}</strong>
            <p>
              {t.service}. A clear service, a local name, and one obvious next
              step.
            </p>
            <span className="demo-call">
              Call for an estimate <span aria-hidden="true">↗</span>
            </span>
          </div>
        </div>
        <div className="flow-result">
          <span className="phone-icon" aria-hidden="true">
            ↗
          </span>
          <div>
            <span className="flow-step">03 / MAKE IT EASY TO CALL</span>
            <strong>
              Less searching.
              <br />
              More getting in touch.
            </strong>
          </div>
        </div>
      </div>
      <p className="flow-disclaimer">
        Illustrative design demo. Not live search results or actual leads.
      </p>
    </aside>
  );
}
// Add your photo to public/ and set this to "/jacob-portrait.jpg".
const JACOB_PHOTO = null;
function Portrait() {
  const [missing, setMissing] = useState(!JACOB_PHOTO);
  return (
    <figure className="portrait reveal">
      <div className="portrait-frame">
        {!missing && (
          <img
            src={JACOB_PHOTO}
            alt="Jacob, independent web designer and developer"
            onError={() => setMissing(true)}
            loading="lazy"
            width="720"
            height="900"
          />
        )}
        {missing && (
          <div className="portrait-placeholder">
            <svg viewBox="0 0 160 180" aria-hidden="true">
              <circle cx="80" cy="51" r="31" />
              <path d="M15 174v-17c0-37 29-61 65-61s65 24 65 61v17" />
            </svg>
            <span>JACOB’S PHOTO GOES HERE</span>
            <small>A real face. Your local web guy.</small>
          </div>
        )}
        <span className="portrait-corner top-left" />
        <span className="portrait-corner bottom-right" />
      </div>
      <figcaption>
        <span>JACOB / DESIGN & DEVELOPMENT</span>
        <span>MORENO VALLEY, CA</span>
      </figcaption>
    </figure>
  );
}
function App() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "dark",
  );
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState(null);
  const [draft, setDraft] = useState("");
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
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const cards = [...document.querySelectorAll(".project-preview")];
    function move(e) {
      if (media.matches || e.pointerType !== "mouse") return;
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
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
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
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
      document.documentElement.dataset.theme = nextTheme;
    });
    transition.ready
      .then(() =>
        document.documentElement.animate(
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
        ),
      )
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
  function prepare(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setDraft(
      "Free homepage mockup request — " +
        service +
        "\n\nName: " +
        data.get("name") +
        "\nEmail: " +
        data.get("email") +
        "\nWebsite: " +
        (data.get("website") || "Not yet") +
        "\n\n" +
        data.get("message"),
    );
  }
  return (
    <>
      <div className="reading-progress" aria-hidden="true" />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header">
        <a href="#" className="logo" aria-label="jacobwebsites. home">
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
          <a href="#work" onClick={() => setMenu(false)}>
            Work <sup>02</sup>
          </a>
          <a href="#services" onClick={() => setMenu(false)}>
            Services
          </a>
          <a href="#about" onClick={() => setMenu(false)}>
            About
          </a>
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setMenu(false)}
          >
            Free mockup <Arrow />
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
            className="menu-toggle"
            aria-expanded={menu}
            aria-controls="mobile-links"
            onClick={() => setMenu(!menu)}
          >
            {menu ? "Close −" : "Menu +"}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero trade-hero">
          <div className="hero-kicker">
            <span>
              <i className="status-dot" /> WEB DESIGN FOR THE TRADES
            </span>
            <span className="hero-location">
              MORENO VALLEY, CA / WORKING WITH LOCAL BUSINESSES
            </span>
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <span className="hero-label">YOU HANDLE THE HARD WORK.</span>
              <h1>
                <span>
                  <b>GOOD WORK.</b>
                </span>
                <span>
                  <b>DESERVES</b>
                </span>
                <span className="headline-accent">
                  <b>MORE CALLS.</b>
                </span>
              </h1>
              <p className="hero-intro">
                I build websites that help homeowners find your trade business,
                trust your work, and get in touch.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#contact">
                  Get my free mockup <Arrow />
                </a>
                <a className="text-link" href="#work">
                  See the redesigns <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="offer-note">
                A free homepage design preview. No payment. No obligation.
              </p>
              <span className="hero-byline">
                HVAC · PLUMBING · ELECTRICAL · CONTRACTORS
              </span>
            </div>
            <CallFlow />
          </div>
          <div className="hero-bottomline">
            <span>
              BUILT BY JACOB. FOR BUSINESSES THAT BUILD, FIX & KEEP THINGS
              RUNNING.
            </span>
            <a href="#work">
              TAKE A LOOK <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <div className="trade-ribbon">
          <span>LOCAL BUSINESS.</span>
          <span>REAL WORK.</span>
          <span>A CLEAR WAY TO CALL.</span>
          <a href="#contact">YOUR FREE MOCKUP STARTS HERE ↗</a>
        </div>
        <section id="work" className="work section">
          <div className="section-top reveal">
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2>
              A clearer path
              <br />
              <span>to the next call.</span>
            </h2>
            <p>
              See how clearer services and easier contact can change a trade
              website. Open a project to explore the design. Independent
              concepts are clearly labeled.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((p, i) => (
              <article className={"project reveal " + p.className} key={p.id}>
                <button
                  className="project-preview"
                  onClick={(e) => openProject(p, e)}
                >
                  <div className="preview-bar" aria-hidden="true">
                    <span>
                      0{i + 1} / {p.type}
                    </span>
                    <span className="preview-open">
                      <Arrow />
                    </span>
                  </div>
                  <div aria-hidden="true">
                    <ProjectVisual project={p} />
                  </div>
                  <span className="project-hint">
                    Explore project: {p.name} <span aria-hidden="true">↗</span>
                  </span>
                </button>
                <div className="project-caption">
                  <h3>{p.name}</h3>
                  <span>{p.tag}</span>
                </div>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
          <div className="work-note">
            <span aria-hidden="true">↳</span> The KMA study is a self-initiated
            concept, not commissioned client work.
          </div>
        </section>
        <section className="services section" id="services">
          <div className="section-top reveal">
            <span className="eyebrow">02 / WHAT I DO</span>
            <h2>
              Help them find you.
              <br />
              <span>Help them call you.</span>
            </h2>
            <p>
              A homeowner needs to know what you do, where you work, and how to
              reach you. Your site should answer all three.
            </p>
          </div>
          <div className="service-list">
            {[
              {
                n: "01",
                name: "Website design",
                sub: "Show the work. Earn their confidence.",
                body: "Clear service pages, your real project photos, and a design that helps homeowners understand why to choose your business.",
                tags: "SERVICES / SERVICE AREAS / REAL PROJECTS",
              },
              {
                n: "02",
                name: "Websites built for calls",
                sub: "Easy to use. Especially on a phone.",
                body: "Fast, mobile-friendly pages with visible call buttons and straightforward quote requests. Less friction between finding your business and getting in touch.",
                tags: "MOBILE / CLICK TO CALL / QUOTE REQUESTS",
              },
              {
                n: "03",
                name: "Website rebuilds",
                sub: "Make your existing site work harder.",
                body: "Outdated site? Start with a free homepage mockup. See a new direction for your services and contact flow before deciding on a paid build.",
                tags: "FREE MOCKUP / REDESIGN / PAID BUILD",
              },
            ].map((s) => (
              <details className="service reveal" key={s.n}>
                <summary>
                  <span className="service-no">{s.n}</span>
                  <h3>{s.name}</h3>
                  <span className="service-sub">{s.sub}</span>
                  <span className="plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <div className="service-body">
                  <p>{s.body}</p>
                  <span>{s.tags}</span>
                </div>
              </details>
            ))}
          </div>
          <div className="process reveal">
            <span className="eyebrow">HOW WE GET THERE</span>
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
            <span className="eyebrow">03 / HI, I’M JACOB</span>
            <h2>
              Your local web guy.
              <br />
              Hi, I’m Jacob.
            </h2>
            <p className="large-copy">
              You’re good at your trade. I’ll help your website show it.
            </p>
            <p>
              I’m an independent web designer and developer in Moreno Valley,
              building websites for HVAC companies, plumbers, electricians, and
              contractors.
            </p>
            <p>
              You work directly with me, from the first mockup to the finished
              website. We’ll focus on your services, your service area, and
              making it easy for a customer to call or request a quote.
            </p>
            <a className="text-link" href="#contact">
              Let me take a look at your site <Arrow />
            </a>
          </div>
        </section>
        <section className="contact section" id="contact">
          <div className="contact-heading reveal">
            <span className="eyebrow">04 / YOUR FREE HOMEPAGE MOCKUP</span>
            <h2>
              Send your site.
              <br />
              <span className="offer-accent">
                I’ll redesign
                <br />
                it for free.
              </span>
            </h2>
            <p>
              A free homepage mockup for your trade business. See the direction
              before you decide whether to hire me.
            </p>
            <div className="offer-scope">
              <span>WHAT’S FREE</span>
              <strong>A homepage design preview.</strong>
              <p>
                A full website build is a separate paid project. No obligation
                to continue.
              </p>
            </div>
          </div>
          <form
            onSubmit={prepare}
            className="inquiry reveal"
            onChange={() => draft && setDraft("")}
          >
            <fieldset>
              <legend>What does your business need?</legend>
              <div className="service-choices">
                {["New website", "Website rebuild", "Something else"].map(
                  (s) => (
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
                        {service === s ? "↗" : "+"}
                      </span>
                    </label>
                  ),
                )}
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
              Your trade & service area{" "}
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={3}
                placeholder="e.g. HVAC in Moreno Valley. We want more AC repair calls."
              />
            </label>
            <button className="button primary submit" type="submit">
              Get my free mockup <Arrow />
            </button>
            <p className="form-note">
              This form prepares an email draft. Nothing is sent or stored here.
            </p>
            {draft && (
              <div className="draft" role="status">
                <strong>Your free mockup request is ready.</strong>
                <p>
                  Open it in your email app, then check the recipient and send.
                  No message has been sent yet.
                </p>
                <a
                  className="button"
                  href={
                    "mailto:hello@jacobwebsites.com?subject=" +
                    encodeURIComponent("Free homepage mockup request") +
                    "&body=" +
                    encodeURIComponent(draft)
                  }
                >
                  Open email draft <Arrow />
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
      </main>
      <footer>
        <a className="footer-logo" href="#">
          jacobwebsites<span>.</span>
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jacob Websites</span>
          <span>Websites for trades. Moreno Valley, CA.</span>
          <a href="#main">Back to top ↑</a>
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
          <span>PROJECT NOTES / {active?.tag}</span>
          <button onClick={closeProject} aria-label="Close project">
            Close ×
          </button>
        </div>
        {active && (
          <>
            <ProjectVisual project={active} />
            <div className="dialog-copy">
              <span className="eyebrow">
                {active.name} / {active.type}
              </span>
              <h2 id="project-title">{active.title}</h2>
              <p>{active.detail}</p>
              <button
                className="button"
                onClick={() => {
                  closeProject();
                  location.hash = "contact";
                }}
              >
                Get a free mockup for your business <Arrow />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
