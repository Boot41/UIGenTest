import React, { useState } from 'react';

const JobPostSuccessNotification = ({ jobListingUrl }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-labelledby="notification-title"
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '600px',
        padding: '10px',
        background: 'linear-gradient(to right, lightGradientFrom, lightGradientVia, lightGradientTo)',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1000,
        fontSize: window.innerWidth < 768 ? '14px' : '16px',
        fontWeight: 'bold',
      }}
    >
      <span id="notification-title" style={{ flex: 1 }}>
        Your job has been posted successfully!
      </span>
      <button
        onClick={() => window.location.href = jobListingUrl}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          backgroundColor: 'primaryButton',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          marginRight: '10px',
        }}
      >
        View Your Listing
      </button>
      <button
        onClick={handleClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
        }}
        aria-label="Close notification"
        onMouseOver={(e) => (e.currentTarget.style.color = 'red')}
        onMouseOut={(e) => (e.currentTarget.style.color = 'black')}
      >
        &times;
      </button>
    </div>
  );
};

export default JobPostSuccessNotification;