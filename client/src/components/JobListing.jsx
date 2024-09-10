import React, { useState, useEffect } from 'react';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [sortOption, setSortOption] = useState('date');
  const [filterOption, setFilterOption] = useState('all');
  
  useEffect(() => {
    // Fetch job listings from API (mocked here)
    const fetchJobs = async () => {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const response = await fetch(`/api/apply/${jobId}`, { method: 'POST' });
    if (response.ok) {
      alert('Application submitted successfully!');
    } else {
      alert('Failed to submit application.');
    }
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
    const sortedJobs = [...filteredJobs].sort((a, b) => /* sort logic based on sortOption */);
    setFilteredJobs(sortedJobs);
  };

  const handleFilter = (e) => {
    setFilterOption(e.target.value);
    const filtered = jobs.filter(job => /* filter logic based on filterOption */);
    setFilteredJobs(filtered);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', border: '1px solid lightgray', borderRadius: '8px' }}>
      <div>
        <select aria-label="Sort jobs" onChange={handleSort} style={{ marginRight: '10px' }}>
          <option value="date">Date Posted</option>
          <option value="type">Job Type</option>
        </select>
        <select aria-label="Filter jobs" onChange={handleFilter}>
          <option value="all">All</option>
          <option value="remote">Remote</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
        </select>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {filteredJobs.map(job => (
          <div key={job.id} 
               style={{ 
                 border: '1px solid lightgray', borderRadius: '8px', padding: '15px', 
                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                 transition: 'transform 0.2s', 
                 cursor: 'pointer' 
               }} 
               onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} 
               onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
               aria-labelledby={`job-title-${job.id}`} >
            <h3 id={`job-title-${job.id}`} style={{ fontSize: '18px', fontWeight: 'bold' }}>{job.title}</h3>
            <p style={{ fontSize: '14px' }}>{job.company} - {job.location}</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>{job.type}</p>
            <p style={{ fontSize: '14px' }}>{job.description}</p>
            <button onClick={() => handleApply(job.id)} 
                    style={{ 
                      backgroundColor: '#340487', color: 'white', border: 'none', 
                      padding: '10px', borderRadius: '5px', cursor: 'pointer',
                      transition: 'background-color 0.3s' 
                    }} 
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4A0C9E'} 
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#340487'}
                    aria-label={`Apply for ${job.title}`}>
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListing;