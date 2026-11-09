import React from "react";
import "./services-page.css";

const rows = [
  ["Managed hosting", "✓", "✓"],
  ["SSL", "✓", "✓"],
  ["Website backups", "✓", "✓"],
  ["Uptime monitoring", "✓", "✓"],
  ["Routine security maintenance", "✓", "✓"],
  ["Technical maintenance", "✓", "✓"],
  ["Existing-site bug fixes", "✓", "✓"],
  ["Domain & DNS assistance", "✓", "✓"],
  ["Content & update time", "30 min / month", "90 min / month"],
  ["Website health review", "Quarterly", "Monthly"],
  ["Analytics", "Quarterly overview", "Monthly review"],
  ["Technical SEO maintenance", "✓", "✓"],
  ["On-page SEO improvements", "—", "✓"],
  ["Small design & usability improvements", "—", "✓"],
  ["Support", "Standard", "Priority"],
  ["Target response", "~2 business days", "~1 business day"],
  ["Critical outages prioritized", "✓", "✓"],
  ["Unused update time", "No rollover", "No rollover"],
];

export default function ServicesPage() {
  return (
    <div className="services-page">
      <section className="services-hero">
        <span className="eyebrow">Services / Jacob Websites</span>
        <h1>Website design, development, and maintenance.</h1>
        <p>
          Custom website design and development for independent businesses,
          followed by an optional monthly plan if you want me to keep managing
          the site after launch.
        </p>
        <div className="services-hero-actions">
          <a className="button primary" href="/#contact">
            Discuss your project
          </a>
          <a className="text-link" href="#management">
            See monthly plans
          </a>
        </div>
      </section>

      <section className="services-build">
        <div className="services-section-heading">
          <span className="eyebrow">Design & development</span>
          <h2>A defined scope before work begins.</h2>
          <p>
            We agree on the pages, features, and responsibilities before the
            build starts. I’m currently offering free design and development for
            a limited number of portfolio projects. Hosting, domain fees, and
            ongoing maintenance are separate.
          </p>
        </div>
        <div className="services-build-grid">
          <article>
            <span>Design</span>
            <h3>Page layouts and content.</h3>
            <p>
              Page structure, visual direction, calls to action, responsive
              layouts, and content presentation built around your customers.
            </p>
          </article>
          <article>
            <span>Development</span>
            <h3>Responsive development and launch.</h3>
            <p>
              Responsive development, accessible navigation, forms,
              integrations, keyboard controls, and the technical work needed to
              launch.
            </p>
          </article>
          <article>
            <span>Rebuilds</span>
            <h3>Updates to an existing website.</h3>
            <p>
              If an existing site no longer represents the work you do, I can
              reorganize its pages, update the design, and improve service and
              contact information.
            </p>
          </article>
        </div>
        <div className="services-ownership">
          <strong>No monthly plan is required.</strong>
          <p>
            Once the agreed project is complete and any applicable balance is
            settled, you can take the site and manage it yourself. Ongoing
            management is an option, not a condition of owning your website.
          </p>
        </div>
      </section>

      <section className="services-management" id="management">
        <div className="services-section-heading">
          <span className="eyebrow">After launch</span>
          <h2>Optional monthly maintenance.</h2>
          <p>
            Both plans cover the technical upkeep of your existing website. Full
            Service adds more hands-on time and a more active improvement cycle.
          </p>
        </div>

        <div className="plan-intro">
          <article>
            <span>Basic</span>
            <div className="plan-price">
              <strong>$99</strong>
              <small>/ month</small>
            </div>
            <p>
              Hosting, technical maintenance, and 30 minutes of content updates
              each month.
            </p>
          </article>
          <article className="plan-featured">
            <span>Full Service</span>
            <div className="plan-price">
              <strong>$199</strong>
              <small>/ month</small>
            </div>
            <p>
              Maintenance plus 90 minutes of updates and small improvements each
              month.
            </p>
          </article>
        </div>

        <div className="plan-table-wrap">
          <table className="plan-table">
            <thead>
              <tr>
                <th scope="col">Included</th>
                <th scope="col">Basic</th>
                <th scope="col">Full Service</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([feature, basic, full]) => (
                <tr key={feature}>
                  <th scope="row">{feature}</th>
                  <td>{basic}</td>
                  <td>{full}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="plan-boundaries">
          <div>
            <span className="eyebrow">What the included time covers</span>
            <p>
              Updates to existing content, images, business information, and
              other small changes to the current site. Full Service can also use
              its included time for small design and usability improvements.
            </p>
          </div>
          <div>
            <span className="eyebrow">Quoted separately</span>
            <p>
              Redesigns, major new pages, ecommerce, booking systems, portals,
              custom calculators, backend or database work, major integrations,
              copywriting, media production, advertising, branding, premium
              licenses, unusual infrastructure, and work beyond the included
              monthly time.
            </p>
          </div>
        </div>

        <p className="plan-note">
          Unused update time does not roll over. Response times are targets, not
          guaranteed resolution times. Search rankings are never guaranteed.
          Third-party and domain fees are separate where applicable.
        </p>
      </section>

      <section className="services-cta">
        <span className="eyebrow">Start with the website</span>
        <h2>Discuss the pages and features you need.</h2>
        <p>
          Send your current website and a short description of the project. I’ll
          reply to discuss the work, availability, and whether it fits the
          portfolio offer.
        </p>
        <a className="button primary" href="/#contact">
          Discuss your project
        </a>
      </section>
    </div>
  );
}
