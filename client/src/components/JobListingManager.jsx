import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobListingManager = ({ employerId }) => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch(`/api/employers/${employerId}/jobs`);
      const data = await response.json();
      setJobs(data);
    };
    fetchJobs();
  }, [employerId]);

  const handleEdit = (jobId) => {
    navigate(`/edit-job/${jobId}`);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await fetch(`/api/employers/${employerId}/jobs/${jobId}`, { method: 'DELETE' });
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button 
        onClick={() => navigate('/create-job')} 
        style={{ marginBottom: "20px", padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }}>
        Create New Job
      </button>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", fontWeight: "bold" }}>
              <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>Job Title</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>Company Name</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>Posted Date</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id} style={{ backgroundColor: job.id % 2 === 0 ? "#ffffff" : "#f2f2f2" }}>
                <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>{job.title}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>{job.company}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>{new Date(job.postedDate).toLocaleDateString()}</td>
                <td style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
                  <button 
                    onClick={() => handleEdit(job.id)} 
                    style={{ marginRight: "8px", backgroundColor: "#007bff", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "5px" }} aria-label="Edit Job">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(job.id)} 
                    style={{ backgroundColor: "transparent", color: "red", border: "1px solid red", padding: "6px 12px", borderRadius: "5px" }} aria-label="Delete Job">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListingManager;