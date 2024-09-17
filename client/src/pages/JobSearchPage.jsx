import React from 'react';
import JobSearchFilter from '../components/JobSearchFilter';
import JobListing from '../components/JobListing';

const JobSearchPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <header className="bg-blue-800 text-white shadow-md p-4">
        <h1 className="text-xl font-bold">Job Search</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-orange-500">Home</a></li>
            <li><a href="/jobs" className="hover:text-orange-500">Jobs</a></li>
            <li><a href="/about" className="hover:text-orange-500">About</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 bg-white">
        <JobSearchFilter />

        <div className="mt-4">
          <JobListing />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; 2023 Job Search Inc.</p>
      </footer>
    </div>
  );
};

export default JobSearchPage;