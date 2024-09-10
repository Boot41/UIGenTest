import React from 'react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-xl font-bold">Site Logo</div>
            <nav className="hidden md:flex space-x-4">
                <a href="#about" className="text-gray-700">About</a>
                <a href="#jobs" className="text-gray-700">Jobs</a>
                <a href="#contact" className="text-gray-700">Contact</a>
            </nav>
            <div className="md:hidden">
                {/* Dropdown Menu for smaller screens */}
            </div>
        </header>
    );
};

const JobApplicationForm = () => {
    return (
        <form className="max-w-4xl mx-auto p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" required className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input type="email" placeholder="Email" required className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Phone Number" required className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input type="file" placeholder="Resume" required className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <textarea placeholder="Cover Letter" required className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit Application</button>
            {/* Success/Error messages here */}
        </form>
    );
};

const Footer = () => {
    return (
        <footer className="bg-white shadow-md p-4 text-center">
            <p className="text-gray-700">© 2023 Company Name. All rights reserved.</p>
        </footer>
    );
};

const JobApplicationPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4">
                <h1 className="text-2xl font-bold mb-4">Job Application</h1>
                <JobApplicationForm />
            </main>
            <Footer />
        </div>
    );
};

export default JobApplicationPage;