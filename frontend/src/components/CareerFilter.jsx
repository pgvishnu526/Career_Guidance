import React, { useState } from 'react';
import './CareerFilter.css';

const CareerFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    industry: '',
    experience: '',
    salary: '',
    remote: false
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="card career-filter">
      <div className="card-header">
        <h3>Filter Careers</h3>
      </div>
      <div className="card-body">
        <div className="filter-group">
          <label>Industry</label>
          <select 
            value={filters.industry} 
            onChange={(e) => handleFilterChange('industry', e.target.value)}
          >
            <option value="">All Industries</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="finance">Finance</option>
            <option value="education">Education</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Experience Level</label>
          <select 
            value={filters.experience} 
            onChange={(e) => handleFilterChange('experience', e.target.value)}
          >
            <option value="">Any Experience</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Salary Range</label>
          <select 
            value={filters.salary} 
            onChange={(e) => handleFilterChange('salary', e.target.value)}
          >
            <option value="">Any Salary</option>
            <option value="0-50000">$0 - $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
            <option value="100000+">$100,000+</option>
          </select>
        </div>

        <div className="filter-group checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={filters.remote} 
              onChange={(e) => handleFilterChange('remote', e.target.checked)}
            />
            Remote Opportunities
          </label>
        </div>

        <button 
          className="btn btn-outline"
          onClick={() => {
            const resetFilters = {
              industry: '',
              experience: '',
              salary: '',
              remote: false
            };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default CareerFilter;