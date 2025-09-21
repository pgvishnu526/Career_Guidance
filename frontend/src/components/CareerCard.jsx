import React, { useState } from "react";
import "./CareerCard.css";

function CareerCard({ career }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  // Function to get salary range display
  const getSalaryDisplay = () => {
    if (career.avg_salary_inr) {
      return `₹${formatSalary(career.avg_salary_inr)}`;
    }
    return "Competitive";
  };

  // Function to get education count with better formatting
  const getEducationDisplay = () => {
    const count = career.education?.length || 0;
    if (count === 0) return "Flexible";
    if (count === 1) return "1 path";
    return `${count} paths`;
  };

  // Function to get skills count with better formatting
  const getSkillsDisplay = () => {
    const count = career.skills_core?.length || 0;
    if (count === 0) return "Basic";
    if (count <= 3) return `${count} core`;
    return `${count} skills`;
  };

  // Function to get pathway color based on type
  const getPathwayColor = (pathway) => {
    const colors = {
      'Technology': '#6366f1',
      'Creative': '#ec4899',
      'Business': '#10b981',
      'Healthcare': '#f59e0b',
      'Education': '#8b5cf6',
      'Engineering': '#06b6d4',
      'Finance': '#84cc16',
      'Marketing': '#f97316',
      'Design': '#ef4444',
      'Science': '#14b8a6'
    };
    return colors[pathway] || '#6366f1';
  };

  return (
    <div
      className={`career-card ${isExpanded ? 'expanded' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={toggleExpand}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="career-card-bg"></div>
      
      <div className="career-card-header">
        <div className="career-title-section">
          <h3 className="career-title">{career.role}</h3>
          <div className="career-subtitle">
            <span className="company-type">
              {career.industry || 'Multiple Industries'}
            </span>
            <span className="location-indicator">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Remote/Hybrid
            </span>
          </div>
        </div>
        <div className="career-actions">
          <button
            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={toggleBookmark}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark career"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
              {isBookmarked ? (
                <path fill="currentColor" d="M5 21V5q0-.825.588-1.413Q6.175 3 7 3h10q.825 0 1.413.587Q19 4.175 19 5v16l-7-3-7 3Z"/>
              ) : (
                <path fill="currentColor" d="M5 21V5q0-.825.588-1.413Q6.175 3 7 3h10q.825 0 1.413.587Q19 4.175 19 5v16l-7-3-7 3Zm2-3.05L12 15.8l5 2.15V5H7v12.95ZM7 5h10H7Z"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div 
        className="pathway-badge"
        style={{ backgroundColor: getPathwayColor(career.pathway) }}
      >
        <span className="pathway-icon">
          {career.pathway === 'Technology' && '💻'}
          {career.pathway === 'Creative' && '🎨'}
          {career.pathway === 'Business' && '💼'}
          {career.pathway === 'Healthcare' && '🏥'}
          {career.pathway === 'Education' && '📚'}
          {career.pathway === 'Engineering' && '⚙️'}
          {career.pathway === 'Finance' && '💰'}
          {career.pathway === 'Marketing' && '📈'}
          {career.pathway === 'Design' && '✨'}
          {career.pathway === 'Science' && '🔬'}
          {!['Technology', 'Creative', 'Business', 'Healthcare', 'Education', 'Engineering', 'Finance', 'Marketing', 'Design', 'Science'].includes(career.pathway) && '🌟'}
        </span>
        {career.pathway}
      </div>

      <div className="career-stats">
        <div className="stat salary-stat">
          <span className="stat-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
            </svg>
            Avg. Salary
          </span>
          <span className="stat-value">{getSalaryDisplay()}</span>
        </div>
        <div className="stat education-stat">
          <span className="stat-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>
            Education
          </span>
          <span className="stat-value">{getEducationDisplay()}</span>
        </div>
        <div className="stat skills-stat">
          <span className="stat-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Core Skills
          </span>
          <span className="stat-value">{getSkillsDisplay()}</span>
        </div>
      </div>

      <div className="career-description">
        <p>{career.description}</p>
      </div>

      {/* Growth Indicator */}
      <div className="growth-indicators">
        <div className="growth-item">
          <span className="growth-label">Job Growth</span>
          <div className="growth-bar">
            <div className="growth-fill" style={{width: '75%'}}></div>
          </div>
          <span className="growth-percentage">+15%</span>
        </div>
        <div className="experience-level">
          <span className="exp-label">Experience Level</span>
          <span className="exp-value">Entry to Senior</span>
        </div>
      </div>

      {isExpanded && (
        <div className="expanded-details">
          <div className="skills-section">
            <h4>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Core Skills Required
            </h4>
            <div className="skills-list">
              {career.skills_core?.map((skill, index) => (
                <span key={index} className="skill-tag">
                  <span className="skill-icon">💡</span>
                  {skill}
                </span>
              )) || <span className="no-skills">Skills not specified</span>}
            </div>
          </div>

          <div className="education-section">
            <h4>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
              </svg>
              Education Pathways
            </h4>
            <ul className="education-list">
              {career.education?.map((path, index) => (
                <li key={index}>
                  <span className="education-icon">🎓</span>
                  {path}
                </li>
              )) || <li><span className="education-icon">📚</span>Education requirements not specified</li>}
            </ul>
          </div>

          <div className="additional-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Work Environment</span>
                <span className="info-value">Office/Remote</span>
              </div>
              <div className="info-item">
                <span className="info-label">Career Level</span>
                <span className="info-value">All Levels</span>
              </div>
              <div className="info-item">
                <span className="info-label">Industry Demand</span>
                <div className="demand-indicator high">
                  <div className="demand-dot"></div>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          <div className="career-cta">
            <button className="cta-btn primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
              </svg>
              Explore Career Path
            </button>
            <button className="cta-btn secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V6h10v3z"/>
              </svg>
              Save for Later
            </button>
          </div>
        </div>
      )}

      <div className="expand-indicator" onClick={(e) => e.stopPropagation()}>
        <button className="expand-btn" onClick={toggleExpand}>
          <span>{isExpanded ? 'Show less' : 'Show more details'}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}
          >
            <path fill="currentColor" d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CareerCard;