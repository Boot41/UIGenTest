import React, { useState } from 'react';

const JobApplicationForm = ({ jobId }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset errors
    let formErrors = {};
    
    if (!resume) formErrors.resume = "Resume is required";
    if (!coverLetter) formErrors.coverLetter = "Cover letter is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('coverLetter', coverLetter);
    formData.append('additionalDetails', additionalDetails);

    setLoading(true);

    try {
      await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        body: formData,
      });
      setSuccess(true);
    } catch (error) {
      console.error("Submission failed:", error);
      // Optionally handle submission error
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: 'auto',
      padding: window.innerWidth < 768 ? '10px' : '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
      {success && (
        <div style={{ marginBottom: '20px', backgroundColor: '#340487', color: 'white', padding: '10px', borderRadius: '5px' }}>
          <p>Application submitted successfully!</p>
          <button onClick={handleCloseSuccess} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Close</button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="resume" style={{ fontSize: '16px', display: 'block', marginBottom: '5px' }}>Upload Resume</label>
          <input 
            type="file" 
            id="resume" 
            onChange={(e) => setResume(e.target.files[0])} 
            aria-labelledby="Resume upload" 
            style={{ padding: '20px', width: '100%', border: '1px solid #ccc', borderRadius: '5px' }} 
            required
          />
          {errors.resume && <span style={{ color: 'red' }}>{errors.resume}</span>}
        </div>

        <div>
          <label htmlFor="coverLetter" style={{ fontSize: '16px', display: 'block', marginBottom: '5px' }}>Cover Letter</label>
          <textarea 
            id="coverLetter" 
            value={coverLetter} 
            onChange={(e) => setCoverLetter(e.target.value)} 
            style={{ padding: '20px', width: '100%', border: '1px solid #ccc', borderRadius: '5px' }} 
            required 
          />
          {errors.coverLetter && <span style={{ color: 'red' }}>{errors.coverLetter}</span>}
        </div>

        <div>
          <label htmlFor="additionalDetails" style={{ fontSize: '16px', display: 'block', marginBottom: '5px' }}>Additional Details</label>
          <textarea 
            id="additionalDetails" 
            value={additionalDetails} 
            onChange={(e) => setAdditionalDetails(e.target.value)} 
            style={{ padding: '20px', width: '100%', border: '1px solid #ccc', borderRadius: '5px' }} 
          />
        </div>

        <button 
          type="submit" 
          Disabled={loading}
          style={{ 
            backgroundColor: '#340487', 
            color: 'white', 
            padding: '20px', 
            border: 'none', 
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default JobApplicationForm;