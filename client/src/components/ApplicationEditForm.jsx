import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationEditForm = ({ applicationId }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const updateApplicationHandler = ()=>{
    
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);
    formData.append('additionalDetails', additionalDetails);

    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Submission failed');
      setSuccessMessage('Application updated successfully!');
      updateApplicationHandler(); // Assuming you have this function defined
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <form onSubmit={handleSubmit} aria-labelledby="application-edit-form">
        <label style={{ fontWeight: 'bold', fontSize: '16px' }} htmlFor="resume">Resume</label>
        <input
          type="file"
          id="resume"
          onChange={(e) => setResume(e.target.files[0])}
          style={{ padding: window.innerWidth < 768 ? '8px' : '12px', width: '100%', marginBottom: '10px' }}
          aria-required="true"
        />

        <label style={{ fontWeight: 'bold', fontSize: '16px' }} htmlFor="coverLetter">Cover Letter</label>
        <textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          style={{ padding: window.innerWidth < 768 ? '8px' : '12px', width: '100%', marginBottom: '10px' }}
          aria-required="true"
        ></textarea>

        <label style={{ fontWeight: 'bold', fontSize: '16px' }} htmlFor="additionalDetails">Additional Details</label>
        <textarea
          id="additionalDetails"
          value={additionalDetails}
          onChange={(e) => setAdditionalDetails(e.target.value)}
          style={{ padding: window.innerWidth < 768 ? '8px' : '12px', width: '100%', marginBottom: '10px' }}
        ></textarea>

        <button
          type="submit"
          style={{
            backgroundColor: '#007BFF', color: '#FFFFFF', padding: '10px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer',
            transition: 'background-color 0.3s', width: '100%',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default ApplicationEditForm;