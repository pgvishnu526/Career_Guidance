import React from "react";
import "./CareerPathway.css";

export default function CareerPathway({ pathway }) {
  const steps = pathway.split(" -> ");
  return (
    <div className="career-pathway">
      {steps.map((step, idx) => (
        <div key={idx} className="path-step">
          {step} {idx < steps.length - 1 && "→"}
        </div>
      ))}
    </div>
  );
}
