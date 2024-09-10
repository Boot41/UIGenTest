import React from 'react';

const EmployerDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Company Logo</div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#jobs" className="hover:underline">Jobs</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col md:flex-row p-4">
        {/* Job Posting Form Section */}
        <section className="md:w-1/2 p-2">
          <JobPostingForm />
        </section>

        {/* Job Listing Manager Section */}
        <section className="md:w-1/2 p-2">
          <JobListingManager />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2023 Company Name
      </footer>
    </div>
  );
};

const JobPostingForm = () => {
  return (
    <form className="bg-gray-100 p-4 border rounded" aria-labelledby="job-posting-form">
      <h2 id="job-posting-form" className="text-lg font-semibold mb-2">Create Job Posting</h2>
      <label className="block mb-2" htmlFor="job-title">Job Title:</label>
      <input type="text" id="job-title" className="w-full p-2 border rounded" aria-required="true" />

      <label className="block mb-2" htmlFor="job-description">Description:</label>
      <textarea id="job-description" className="w-full p-2 border rounded" aria-required="true"></textarea>

      <label className="block mb-2" htmlFor="job-requirements">Requirements:</label>
      <textarea id="job-requirements" className="w-full p-2 border rounded"></textarea>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Submit</button>
    </form>
  );
};

const JobListingManager = () => {
  return (
    <div className="bg-gray-100 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Job Listings</h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Job Title</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample Row */}
          <tr>
            <td className="border p-2">Software Engineer</td>
            <td className="border p-2">
              <button className="text-blue-500 hover:underline" onClick={() => { }}>Edit</button>
              <button className="text-red-500 hover:underline ml-2" onClick={() => { }}>Delete</button>
            </td>
          </tr>
          {/* Additional Rows would be mapped here */}
        </tbody>
      </table>
    </div>
  );
};

export default EmployerDashboard;