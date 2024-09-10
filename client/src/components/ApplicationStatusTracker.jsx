import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicationStatusTracker = ({ seekerId }) => {
  const [applications, setApplications] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await axios.get(`/api/job-seekers/${seekerId}/applications`);
      setApplications(response.data);
    };
    fetchApplications();
  }, [seekerId]);

  const handleView = (application) => {
    setSelectedApplication(application);
    setModalOpen(true);
  };

  const filteredApplications = filteredStatus 
    ? applications.filter(app => app.status === filteredStatus) 
    : applications;

  return (
    <div className="bg-gray-100 p-5">
      <header className="mb-5">
        <h1 className="font-bold text-2xl md:text-xl">Job Applications</h1>
        <p className="text-gray-700">Track the status of your job applications below.</p>
      </header>
      <div className="mb-4">
        <label htmlFor="status-filter" className="sr-only">Filter by status</label>
        <select 
          id="status-filter" 
          value={filteredStatus} 
          onChange={(e) => setFilteredStatus(e.target.value)} 
          className="border rounded p-2"
          aria-label="Filter by application status"
        >
          <option value="">All Applications</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        {filteredStatus && <p className="mt-2 text-gray-600">Filtering by: {filteredStatus}</p>}
      </div>
      <table className="w-full table-auto bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Job Title</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Submission Date</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((app) => (
            <tr key={app.id}>
              <td className="p-3 border">{app.jobTitle}</td>
              <td className="p-3 border">{app.status}</td>
              <td className="p-3 border">{new Date(app.submissionDate).toLocaleDateString()}</td>
              <td className="p-3 border">
                <button 
                  onClick={() => handleView(app)} 
                  className="bg-indigo-800 text-white py-1 px-3 rounded hover:bg-indigo-600"
                  aria-label={`View details for ${app.jobTitle}`}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-5">
            <h2 className="font-bold text-xl">Application Details</h2>
            <p><strong>Job Title:</strong> {selectedApplication.jobTitle}</p>
            <p><strong>Status:</strong> {selectedApplication.status}</p>
            <p><strong>Submission Date:</strong> {new Date(selectedApplication.submissionDate).toLocaleDateString()}</p>
            <button 
              onClick={() => setModalOpen(false)} 
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400"
              aria-label="Close modal"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatusTracker;