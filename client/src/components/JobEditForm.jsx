import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobEditForm = ({ jobId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, requirements, location, jobType, deadline }),
      });
      if (response.ok) {
        navigate('/dashboard');
      } else {
        // Handle error accordingly (show notification)
      }
    } catch (error) {
      console.error('Error updating job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '16px', maxWidth: '600px', margin: 'auto' }}>
      <label htmlFor="title" style={{ fontSize: '16px' }}>Job Title</label>
      <input 
        id="title" 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        style={{ height: '40px', fontSize: '14px', padding: '8px', margin: '8px 0', width: '100%' }} 
      />

      <label htmlFor="description" style={{ fontSize: '16px' }}>Description</label>
      <textarea 
        id="description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        style={{ height: '100px', fontSize: '14px', padding: '8px', margin: '8px 0', width: '100%' }} 
      />

      <label htmlFor="requirements" style={{ fontSize: '16px' }}>Requirements</label>
      <textarea 
        id="requirements" 
        value={requirements} 
        onChange={(e) => setRequirements(e.target.value)} 
        style={{ height: '100px', fontSize: '14px', padding: '8px', margin: '8px 0', width: '100%' }} 
      />

      <label htmlFor="location" style={{ fontSize: '16px' }}>Location</label>
      <input 
        id="location" 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        style={{ height: '40px', fontSize: '14px', padding: '8px', margin: '8px 0', width: '100%' }} 
      />

      <label htmlFor="jobType" style={{ fontSize: '16px' }}>Job Type</label>
      <input 
        id="jobType" 
        type="text" 
        value={jobType} 
        onChange={(e) => setJobType(e.target.value)} 
        style={{ height: '40px', fontSize: '14px', padding: '8px', margin: '8px 0', width: '100%' }} 
      />

      <label htmlFor="deadline" style={{ fontSize: '16px' }}>Application Deadline</label>
      <input 
        id="deadline" 
        type="date" 
        value={deadline} 
        onChange={(e) => setDeadline(e.target.value)} 
        style={{ height: '40px', fontSize: '14px', padding: '8px', margin: '8px 0', width: '100%' }} 
      />

      <button 
        type="submit" 
        disabled={loading} 
        style={{ 
          backgroundColor: '#3B82F6', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          height: '40px', 
          minWidth: '240px', 
          margin: '8px 0', 
          cursor: loading ? 'not-allowed' : 'pointer' 
        }} 
      >
        {loading ? 'Updating...' : 'Update Job'}
      </button>

      <button 
        type="button" 
        onClick={handleCancel} 
        style={{ 
          border: '1px solid #D1D5DB', 
          borderRadius: '4px', 
          height: '40px', 
          minWidth: '240px', 
          margin: '8px 0', 
          cursor: 'pointer' 
        }} 
      >
        Cancel
      </button>
    </form>
  );
};

export default JobEditForm;