import React, { useState } from 'react';

// Header component with navigation
const Header = () => (
  <header className="fixed top-0 left-0 w-full bg-white shadow p-4 z-10">
    <h1 className="text-xl font-bold">Edit Job Listing</h1>
    <nav>
      <a href="/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</a>
    </nav>
  </header>
);

// JobEditForm component with inline validation
const JobEditForm = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    let formErrors = {};
    if (!jobTitle) formErrors.jobTitle = "Job title is required.";
    if (!description) formErrors.description = "Description is required.";
    if (!location) formErrors.location = "Location is required.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate a successful submission
      setSuccessMessage('Job listing updated successfully!');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <label>
        Job Title:
        <input 
          type="text" 
          value={jobTitle} 
          onChange={(e) => setJobTitle(e.target.value)} 
          aria-invalid={errors.jobTitle ? "true" : "false"}
          className="border p-2 rounded mt-1 mb-1 w-full" 
        />
        {errors.jobTitle && <span className="text-red-600">{errors.jobTitle}</span>}
      </label>
      <label>
        Description:
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          aria-invalid={errors.description ? "true" : "false"}
          className="border p-2 rounded mt-1 mb-1 w-full"
        />
        {errors.description && <span className="text-red-600">{errors.description}</span>}
      </label>
      <label>
        Location:
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          aria-invalid={errors.location ? "true" : "false"}
          className="border p-2 rounded mt-1 mb-1 w-full"
        />
        {errors.location && <span className="text-red-600">{errors.location}</span>}
      </label>
      <button 
        type="submit" 
        disabled={!jobTitle || !description || !location}
        className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded mt-2"
      >
        Save Changes
      </button>
      {successMessage && <span className="text-green-600 mt-2">{successMessage}</span>}
    </form>
  );
};

// Footer component
const Footer = () => (
  <footer className="bg-gray-800 text-white text-center py-4">
    <p>&copy; 2023 Job Listing App. All rights reserved.</p>
  </footer>
);

// Main layout for EditJobPage
const EditJobPage = () => (
  <div className="min-h-screen flex flex-col pt-16">
    <Header />
    <main className="flex-grow p-4">
      <JobEditForm />
    </main>
    <Footer />
  </div>
);

export default EditJobPage;