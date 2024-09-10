import React, { useState } from "react";

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    applicationDeadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const postJobHandler = async (e) => {
    e.preventDefault();
    // Basic client-side validation
    const { jobTitle, description, requirements, location, jobType, applicationDeadline } = formData;
    if (!jobTitle || !description || !requirements || !location || !jobType || !applicationDeadline) {
      alert("Please fill in all fields.");
      return;
    }
    
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Navigate to dashboard on successful submission
        window.location.href = "/dashboard";
      } else {
        alert("There was an error submitting your job listing.");
      }
    } catch (error) {
      console.error("Error during job submission:", error);
      alert("There was an error submitting your job listing.");
    }
  };

  return (
    <form onSubmit={postJobHandler} className="max-w-lg mx-auto p-4 space-y-4">
      <div>
        <label htmlFor="jobTitle" className="block text-lg font-medium">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitle"
          className="w-full p-4 rounded border border-gray-300"
          value={formData.jobTitle}
          onChange={handleChange}
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-lg font-medium">Description</label>
        <textarea
          name="description"
          id="description"
          className="w-full p-4 rounded border border-gray-300"
          value={formData.description}
          onChange={handleChange}
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="requirements" className="block text-lg font-medium">Requirements</label>
        <textarea
          name="requirements"
          id="requirements"
          className="w-full p-4 rounded border border-gray-300"
          value={formData.requirements}
          onChange={handleChange}
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-lg font-medium">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          className="w-full p-4 rounded border border-gray-300"
          value={formData.location}
          onChange={handleChange}
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="jobType" className="block text-lg font-medium">Job Type</label>
        <select
          name="jobType"
          id="jobType"
          className="w-full p-4 rounded border border-gray-300"
          value={formData.jobType}
          onChange={handleChange}
          aria-required="true"
        >
          <option value="">Select...</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>
      <div>
        <label htmlFor="applicationDeadline" className="block text-lg font-medium">Application Deadline</label>
        <input
          type="date"
          name="applicationDeadline"
          id="applicationDeadline"
          className="w-full p-4 rounded border border-gray-300"
          value={formData.applicationDeadline}
          onChange={handleChange}
          aria-required="true"
        />
      </div>
      <button
        type="submit"
        className="w-full max-w-xs p-4 rounded text-white font-bold"
        style={{
          backgroundColor: "#1e1236",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#b89aff")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e1236")}
      >
        Submit
      </button>
    </form>
  );
};

export default JobPostingForm;