import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const ApplicationStatusTracker = ({ seekerId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`/api/job-seekers/${seekerId}/applications`);
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [seekerId]);

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div style={{ backgroundColor: '#F5F5F5', padding: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Job Application Status</h1>
      <p>Track the status of your job applications.</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {applications.map((app) => (
            <li key={app.id} style={{ padding: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '8px' }}>
              <h2 style={{ fontSize: '16px' }}>{app.jobTitle} at {app.companyName}</h2>
              <p>Submitted on: {new Date(app.submissionDate).toLocaleDateString()}</p>
              <p>Status: {app.status}</p>
              <button 
                onClick={() => openModal(app)}
                aria-label={`Details for ${app.jobTitle}`} 
                style={{ padding: '8px 12px', cursor: 'pointer' }}
              >
                Details
              </button>
            </li>
          ))}
        </ul>
      )}
      {selectedJob && (
        <Modal 
          isOpen={isModalOpen} 
          onRequestClose={closeModal} 
          style={{
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, 
            content: { padding: '20px', borderRadius: '8px' }
          }}
        >
          <h2>{selectedJob.jobTitle}</h2>
          <h3>Company: {selectedJob.companyName}</h3>
          <p>Description: {selectedJob.jobDescription}</p>
          <p>Application History: {selectedJob.applicationHistory}</p>
          <button onClick={closeModal} style={{ marginTop: '20px' }}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default ApplicationStatusTracker;