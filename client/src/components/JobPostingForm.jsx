import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const JobPostingForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    deadline: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    for (const key in formData) {
      if (!formData[key]) newErrors[key] = "This field is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        history.push("/dashboard");
      } else {
        alert("Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while posting the job.");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#F5F5F5",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
        margin: "auto"
      }}
      aria-label="Job Posting Form"
    >
      <label htmlFor="title">Job Title</label>
      <input
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        style={{
          padding: "12px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        style={{
          padding: "12px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      {errors.description && <span style={{ color: "red" }}>{errors.description}</span>}

      <label htmlFor="requirements">Requirements</label>
      <textarea
        id="requirements"
        name="requirements"
        value={formData.requirements}
        onChange={handleChange}
        required
        style={{
          padding: "12px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      {errors.requirements && <span style={{ color: "red" }}>{errors.requirements}</span>}

      <label htmlFor="location">Location</label>
      <input
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        style={{
          padding: "12px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      {errors.location && <span style={{ color: "red" }}>{errors.location}</span>}

      <label htmlFor="jobType">Job Type</label>
      <select
        id="jobType"
        name="jobType"
        value={formData.jobType}
        onChange={handleChange}
        required
        style={{
          padding: "12px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      >
        <option value="">Select</option>
        <option value="full-time">Full-Time</option>
        <option value="part-time">Part-Time</option>
        <option value="contract">Contract</option>
      </select>
      {errors.jobType && <span style={{ color: "red" }}>{errors.jobType}</span>}

      <label htmlFor="deadline">Application Deadline</label>
      <input
        id="deadline"
        name="deadline"
        type="date"
        value={formData.deadline}
        onChange={handleChange}
        required
        style={{
          padding: "12px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />
      {errors.deadline && <span style={{ color: "red" }}>{errors.deadline}</span>}

      <button 
        type="submit"
        style={{
          padding: "12px",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0056b3")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#007BFF")}
      >
        Post Job
      </button>
    </form>
  );
};

export default JobPostingForm;