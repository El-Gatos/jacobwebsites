import React from "react";
import { html, note } from "virtual:service-agreement";
import "./service-agreement.css";

export default function ServiceAgreement() {
  return (
    <div className="agreement-page">
      <div dangerouslySetInnerHTML={{ __html: note }} />
      <article
        className="agreement-document"
        aria-label="Website Services and Care Agreement"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
