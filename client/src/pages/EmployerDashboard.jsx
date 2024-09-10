import React from 'react';

// Header component for navigation
const Header = () => (
  <header className="flex justify-between items-center p-4 bg-white shadow-md">
    <div className="logo">Company Logo</div>
    <nav>
      <ul className="flex space-x-4">
        <li><a href="#home" className="text-blue-600">Home</a></li>
        <li><a href="#post-job" className="text-blue-600">Post Job</a></li>
        <li><a href="#manage-listings" className="text-blue-600">Manage Listings</a></li>
      </ul>
    </nav>
  </header>
);

// JobPostingForm component for submitting new job postings
const JobPostingForm = () => {
  return (
    <form className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
      <input type="text" placeholder="Job Title" className="border p-2 mb-4 w-full" required />
      <textarea placeholder="Job Description" className="border p-2 mb-4 w-full" required />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit</button>
    </form>
  );
};

// JobListingManager component to list posted jobs
const JobListingManager = () => {
  const jobs = [{ id: 1, title: "Software Engineer" }, { id: 2, title: "Product Manager" }]; // Example job data

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Manage Job Listings</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.id} className="flex justify-between items-center p-4 border-b">
            <span>{job.title}</span>
            <div>
              <button className="text-blue-600">Edit</button>
              <button className="text-red-600 ml-4">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Footer component for additional links
const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 mt-6 text-center">
    <p>&copy; 2023 Company Name</p>
    <a href="#privacy-policy" className="text-gray-400">Privacy Policy</a>
  </footer>
);

// Main EmployerDashboard layout
const EmployerDashboard = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex-grow p-6">
        <JobPostingForm />
        <JobListingManager />
      </main>
      <Footer />
    </div>
  );
};

export default EmployerDashboard;