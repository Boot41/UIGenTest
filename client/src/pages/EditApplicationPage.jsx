import React from 'react';
import { ApplicationEditForm } from './ApplicationEditForm';

const EditApplicationPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <header className="sticky top-0 bg-white shadow-md z-10 p-4 flex justify-between items-center">
        <div className="text-lg font-bold">Logo</div>
        <nav className="space-x-4">
          <a href="#section1" className="hover:underline focus:outline-none" aria-label="Go to section 1">Section 1</a>
          <a href="#section2" className="hover:underline focus:outline-none" aria-label="Go to section 2">Section 2</a>
          <a href="#section3" className="hover:underline focus:outline-none" aria-label="Go to section 3">Section 3</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4">
        <ApplicationEditForm />
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <a href="/privacy" className="underline" aria-label="Privacy Policy">Privacy Policy</a> | 
        <a href="/terms" className="underline" aria-label="Terms of Service">Terms of Service</a>
      </footer>
    </div>
  );
};

export default EditApplicationPage;