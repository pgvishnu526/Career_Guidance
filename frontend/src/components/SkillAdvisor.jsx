import React from "react";
import "./SkillAdvisor.css";

export default function SkillAdvisor({ career }) {
  return (
    <div className="skill-advisor-card">
      <h4>{career.role} Skills</h4>
      <p><strong>Must Learn:</strong> {career.skills_core.join(", ")}</p>
      <p><strong>Optional:</strong> {career.skills_nice.join(", ")}</p>
      <p>Resources: <a href="https://www.coursera.org">Coursera</a>, <a href="https://www.youtube.com">YouTube</a></p>
    </div>
  );
}
