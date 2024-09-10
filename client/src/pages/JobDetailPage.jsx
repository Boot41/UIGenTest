import React from 'react';

const JobDetailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Site Logo</div>
        <nav className="hidden md:flex space-x-4">
          <a href="#home" className="text-gray-700">Home</a>
          <a href="#jobs" className="text-gray-700">Jobs</a>
          <a href="#about" className="text-gray-700">About</a>
        </nav>
        <div className="md:hidden"> {/* Hamburger Menu for Mobile */}
          <button aria-label="Menu" className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-20 pb-4 px-4">
        <JobDetailView />
      </main>

      {/* Fixed Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-4">
        <div className="text-center">
          <p>© 2023 Your Company. All rights reserved.</p>
          <nav className="space-x-4">
            <a href="#privacy" className="text-white">Privacy Policy</a>
            <a href="#terms" className="text-white">Terms of Service</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

// JobDetailView Component
const JobDetailView = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2" aria-label="Job Title">Software Engineer</h1>
      <p className="text-gray-600 mb-4" aria-label="Company Name">Company XYZ</p>
      <p className="text-gray-800 mb-4" aria-label="Job Description">
        We are looking for a Software Engineer to join our team. You will work on exciting projects...
      </p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none" aria-label="Apply Now">
        Apply Now
      </button>
      <button className="mt-2 text-blue-600 underline" aria-label="Back to Jobs">Back to Jobs</button>
    </div>
  );
};

export default JobDetailPage;