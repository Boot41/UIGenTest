import React, { useState } from 'react';

const JobSearchFilter = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [postedDate, setPostedDate] = useState('');

  const handleSearch = () => {
    // Implement GET API call based on selected filters
    console.log({ jobTitle, location, jobType, postedDate });
  };

  return (
    <div className="flex flex-col md:flex-row p-6">
      <div className="flex flex-col mb-4 md:mr-4">
        <label htmlFor="jobTitle" className="mb-2">
          Job Title:
        </label>
        <select
          id="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="p-4 rounded border border-gray-300"
          aria-label="Select Job Title"
        >
          <option value="">Select Job Title</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
        </select>
      </div>
      <div className="flex flex-col mb-4 md:mr-4">
        <label htmlFor="location" className="mb-2">
          Location:
        </label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-4 rounded border border-gray-300"
          aria-label="Select Location"
        >
          <option value="">Select Location</option>
          <option value="new-york">New York</option>
          <option value="san-francisco">San Francisco</option>
          <option value="remote">Remote</option>
        </select>
      </div>
      <div className="flex flex-col mb-4 md:mr-4">
        <label htmlFor="jobType" className="mb-2">
          Job Type:
        </label>
        <select
          id="jobType"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="p-4 rounded border border-gray-300"
          aria-label="Select Job Type"
        >
          <option value="">Select Job Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="postedDate" className="mb-2">
          Posted Date:
        </label>
        <input 
          type="date" 
          id="postedDate" 
          value={postedDate} 
          onChange={(e) => setPostedDate(e.target.value)} 
          className="p-4 rounded border border-gray-300" 
          aria-label="Select Posted Date"
        />
      </div>
      <button
        onClick={handleSearch}
        className="mt-4 md:mt-0 bg-blue-500 text-white font-bold p-4 rounded hover:bg-blue-700 transition duration-300 w-4/5 md:max-w-xs"
        aria-label="Search Jobs"
      >
        Search
      </button>
    </div>
  );
};

export default JobSearchFilter;