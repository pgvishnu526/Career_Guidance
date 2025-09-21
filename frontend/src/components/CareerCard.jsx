import React, { useState } from "react";
import "./CareerCard.css";

function CareerCard({ career }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleBookmark = (e) => {
    e.stopPropagation(); // Prevent triggering the expand toggle
    setIsBookmarked(!isBookmarked);
  };

  // Function to format salary with commas
  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div 
      className={`career-card ${isExpanded ? 'expanded' : ''}`}
      onClick={toggleExpand}
    >
      <div className="career-card-header">
        <h3 className="career-title">{career.role}</h3>
        <div className="career-actions">
          <button 
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={toggleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark career"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M5 21h14a2 2 0 0 0 1.84-2.75L13.74 4.99a2 2 0 0 0-3.5 0L3.16 18.25A2 2 0 0 0 5 21z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pathway-badge">{career.pathway}</div>

      <div className="career-stats">
        <div className="stat">
          <span className="stat-label">Avg. Salary</span>
          <span className="stat-value">₹{formatSalary(career.avg_salary_inr)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Education</span>
          <span className="stat-value">{career.education.length} paths</span>
        </div>
        <div className="stat">
          <span className="stat-label">Core Skills</span>
          <span className="stat-value">{career.skills_core.length} skills</span>
        </div>
      </div>

      <div className="career-description">
        <p>{career.description}</p>
      </div>

      {isExpanded && (
        <div className="expanded-details">
          <div className="skills-section">
            <h4>Core Skills Required</h4>
            <div className="skills-list">
              {career.skills_core.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="education-section">
            <h4>Education Pathways</h4>
            <ul className="education-list">
              {career.education.map((path, index) => (
                <li key={index}>{path}</li>
              ))}
            </ul>
          </div>

          <div className="career-cta">
            <button className="cta-btn primary">Explore Career Path</button>
            <button className="cta-btn secondary">Save for Later</button>
          </div>
        </div>
      )}

      <div className="expand-indicator">
        {isExpanded ? 'Show less' : 'Show more'}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="16" 
          height="16"
          className={isExpanded ? 'expanded' : ''}
        >
          <path fill="currentColor" d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z" />
        </svg>
      </div>
    </div>
  );
}

export default CareerCard;