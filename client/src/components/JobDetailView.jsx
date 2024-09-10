import React, { useEffect, useState } from 'react';

const JobDetailView = ({ jobId }) => {
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleGetJob = async () => {
        try {
            const response = await fetch(`/api/jobs/${jobId}`);
            if (!response.ok) throw new Error('Failed to fetch job details');
            const data = await response.json();
            setJobDetails(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetJob();
    }, [jobId]);

    if (loading) {
        return <div style={{ padding: '20px', color: '#666666' }}>Loading job details...</div>;
    }

    if (error) {
        return <div style={{ padding: '20px', color: '#ff0000' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px', color: '#666666', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
            <h1 style={{ color: '#340487', fontSize: '22px', fontWeight: 'bold' }}>{jobDetails.title}</h1>
            <section style={{ margin: '15px 0' }}>
                <h2 style={{ color: '#340487', fontSize: '22px', fontWeight: 'bold' }}>Full Description</h2>
                <p>{jobDetails.description}</p>
            </section>
            <section style={{ margin: '15px 0' }}>
                <h2 style={{ color: '#340487', fontSize: '22px', fontWeight: 'bold' }}>Requirements</h2>
                <ul>
                    {jobDetails.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </section>
            <section style={{ margin: '15px 0' }}>
                <h2 style={{ color: '#340487', fontSize: '22px', fontWeight: 'bold' }}>Benefits</h2>
                <ul>
                    {jobDetails.benefits.map((ben, index) => (
                        <li key={index}>{ben}</li>
                    ))}
                </ul>
            </section>
            <section style={{ margin: '15px 0' }}>
                <h2 style={{ color: '#340487', fontSize: '22px', fontWeight: 'bold' }}>Application Instructions</h2>
                <p>{jobDetails.applicationInstructions}</p>
                <button 
                    style={{ 
                        padding: '10px 15px', 
                        backgroundColor: '#340487', 
                        color: '#ffffff', 
                        border: 'none', 
                        cursor: 'pointer' 
                    }} 
                    onClick={() => alert('Application submitted!')}
                    tabIndex="0" // Ensure keyboard accessibility
                    aria-label="Apply Now"
                >
                    Apply Now
                </button>
            </section>
        </div>
    );
};

export default JobDetailView;