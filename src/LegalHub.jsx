import React from "react";
import "./service-agreement.css";

const documents = [
  {
    href: "/privacy",
    title: "Privacy Policy",
    description: "How information submitted through this site and its services is handled.",
  },
  {
    href: "/terms",
    title: "Terms of Use",
    description: "The terms that apply when visiting and using the Jacob Websites public site.",
  },
  {
    href: "/service-agreement",
    title: "Service Agreement",
    description: "The agreement used for website projects, care plans, payments, ownership, and handoff.",
  },
];

export default function LegalHub() {
  return (
    <div className="agreement-page legal-hub">
      <div className="legal-hub-intro">
        <span className="eyebrow">Jacob Websites</span>
        <h1>Legal</h1>
        <p>
          Policies and agreements for using this website and working with Jacob Websites.
        </p>
      </div>
      <div className="legal-links" aria-label="Legal documents">
        {documents.map((document) => (
          <a className="legal-link" href={document.href} key={document.href}>
            <span>
              <strong>{document.title}</strong>
              <small>{document.description}</small>
            </span>
            <span className="legal-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
