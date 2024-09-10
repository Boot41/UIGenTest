import React from 'react';
import JobSearchFilter from './JobSearchFilter';
import JobListing from './JobListing';

const JobSearchPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-white shadow-md p-4 flex items-center justify-between">
                <div className="text-xl font-bold">Site Logo</div>
                <nav className="space-x-4">
                    <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
                    <a href="/jobs" className="text-gray-600 hover:text-blue-600">Job Listings</a>
                    <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
                </nav>
            </header>
            <main className="flex flex-col flex-1 p-4">
                <section className="mb-4">
                    <JobSearchFilter />
                </section>
                <section className="flex-1">
                    <JobListing />
                </section>
            </main>
        </div>
    );
}

export default JobSearchPage;