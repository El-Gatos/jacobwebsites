import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
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
    text: "The site you’re on. An independent identity with a strong point of view, built around useful details.",
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
      "Project inquiry — " +
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
            Let’s talk <Arrow />
          </a>
        </nav>
        <div className="header-tools">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
        <section className="hero">
          <div className="hero-kicker">
            <span>
              <i className="status-dot" /> INDEPENDENT WEB DESIGN & DEVELOPMENT
            </span>
            <span className="hero-location">
              ONE PERSON. A DIFFERENT PERSPECTIVE.
            </span>
          </div>
          <h1>
            <span>Your business</span>
            <span>isn’t generic.</span>
            <span className="hero-outline">Your website</span>
            <span className="hero-last">
              shouldn’t be.<i aria-hidden="true">↗</i>
            </span>
          </h1>
          <div className="hero-bottom">
            <span className="hero-index">[ STRATEGY / DESIGN / CODE ]</span>
            <div>
              <p>
                I’m Jacob. I design and build distinctive websites for
                businesses ready to look like themselves.
              </p>
              <a className="button lime" href="#contact">
                Let’s build yours <Arrow />
              </a>
              <a className="text-link" href="#work">
                Explore the work <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-side" aria-hidden="true">
            SCROLL TO SEE THE DIFFERENCE ↓
          </div>
        </section>
        <div className="ticker" aria-hidden="true">
          <div>
            BUILT TO BE YOURS. <span>✳</span> DESIGNED WITH INTENT.{" "}
            <span>✳</span> BUILT TO BE YOURS. <span>✳</span> DESIGNED WITH
            INTENT. <span>✳</span>
          </div>
        </div>
        <section id="work" className="work section">
          <div className="section-top reveal">
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2>
              A point of view.
              <br />
              <span>In practice.</span>
            </h2>
            <p>
              A look at how I think, design, and build. Independent concepts are
              labeled, always.
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
              From first idea.
              <br />
              <span>To open for business.</span>
            </h2>
            <p>
              A new start or a better next version. I bring the design and the
              development together.
            </p>
          </div>
          <div className="service-list">
            {[
              {
                n: "01",
                name: "Website design",
                sub: "A look that belongs to your business.",
                body: "Structure, typography, and visual direction shaped around what you do and who you need to reach.",
                tags: "SITE STRATEGY / WIREFRAMES / VISUAL DESIGN",
              },
              {
                n: "02",
                name: "Development",
                sub: "Thoughtful design. Working code.",
                body: "Responsive React websites with accessible navigation, considered interactions, and attention to loading performance.",
                tags: "RESPONSIVE BUILDS / REACT / INTERACTIONS",
              },
              {
                n: "03",
                name: "Website rebuilds",
                sub: "Keep what works. Rethink what doesn’t.",
                body: "A fresh structure and visual direction for an existing site that no longer reflects your business.",
                tags: "SITE REVIEW / REDESIGN / REBUILD",
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
              "Talk it through",
              "Find the direction",
              "Build & refine",
              "Launch with care",
            ].map((s, i) => (
              <div key={s}>
                <small>0{i + 1}</small>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="about section" id="about">
          <div className="about-art reveal" aria-hidden="true">
            <span className="art-label">THE PERSON BEHIND THE PIXELS.</span>
            <div className="art-j">
              j<span>.</span>
            </div>
            <span className="art-label bottom">
              DESIGNER / DEVELOPER / JACOB
            </span>
            <div className="art-stamp">
              ONE
              <br />
              TO ONE ↗
            </div>
          </div>
          <div className="about-copy reveal">
            <span className="eyebrow">03 / HI, I’M JACOB</span>
            <h2>
              A real person.
              <br />A personal stake.
            </h2>
            <p className="large-copy">
              Your website is someone’s first introduction to your business. I
              want to make it a good one.
            </p>
            <p>
              I’m an independent web designer and developer. I’m building Jacob
              Websites around a straightforward idea: good businesses deserve a
              website with a point of view.
            </p>
            <p>
              You work directly with me, from the first conversation through
              design and development. Clear communication, considered decisions,
              and a site we can both stand behind.
            </p>
            <a className="text-link" href="#contact">
              Tell me what you’re working on <Arrow />
            </a>
          </div>
        </section>
        <section className="contact section" id="contact">
          <div className="contact-heading reveal">
            <span className="eyebrow">04 / YOUR NEXT CHAPTER</span>
            <h2>
              Let’s make
              <br />
              some<span className="serif">thing</span>
              <br />
              <span className="contact-lime">you.</span>
              <span aria-hidden="true">↗</span>
            </h2>
            <p>
              Tell me about your business, what you need, and what you’d like to
              do differently.
            </p>
          </div>
          <form
            onSubmit={prepare}
            className="inquiry reveal"
            onChange={() => draft && setDraft("")}
          >
            <fieldset>
              <legend>What are we working on?</legend>
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
              A little about the project{" "}
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={3}
                placeholder="What do you do? What should your website do better?"
              />
            </label>
            <button className="button lime submit" type="submit">
              Prepare my inquiry <Arrow />
            </button>
            <p className="form-note">
              This form prepares an email draft. Nothing is sent or stored here.
            </p>
            {draft && (
              <div className="draft" role="status">
                <strong>Your inquiry is ready.</strong>
                <p>
                  Open it in your email app, then check the recipient and send.
                  No message has been sent yet.
                </p>
                <a
                  className="button"
                  href={
                    "mailto:hello@jacobwebsites.com?subject=" +
                    encodeURIComponent("Website project inquiry") +
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
          <span>Independent by design.</span>
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
                Have a project in mind? <Arrow />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
