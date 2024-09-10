import React from 'react';
import JobPostingForm from './JobPostingForm';
import JobListingManager from './JobListingManager';

const EmployerDashboard = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-800 text-white shadow-md p-4 flex items-center justify-between">
        <div className="font-bold text-lg">Employer Dashboard</div>
        <nav className="space-x-4">
          <a href="#" className="hover:text-blue-400">Home</a>
          <a href="#" className="hover:text-blue-400">Post Job</a>
          <a href="#" className="hover:text-blue-400">Manage Jobs</a>
        </nav>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <section className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-bold mb-2">Post a New Job</h2>
            <JobPostingForm />
          </section>

          <section className="bg-white border rounded-lg shadow-sm p-4 col-span-1 md:col-span-2 lg:col-span-2">
            <h2 className="font-bold mb-2">Manage Job Listings</h2>
            <JobListingManager />
          </section>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;