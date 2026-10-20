import React from "react";
import { html } from "virtual:privacy-policy";
import "./service-agreement.css";

export default function PrivacyPolicy() {
  return (
    <div className="agreement-page">
      <article
        className="agreement-document"
        aria-label="Privacy Policy"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
