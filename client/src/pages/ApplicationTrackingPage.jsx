import React from 'react';

const ApplicationTracking = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-4">
        <ApplicationStatusTracker />
      </main>
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-10">
      <h1 className="text-xl font-bold">Application Tracking</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#dashboard" className="text-blue-600">Dashboard</a></li>
          <li><a href="#applications" className="text-blue-600">Applications</a></li>
          <li><a href="#profile" className="text-blue-600">Profile</a></li>
        </ul>
      </nav>
    </header>
  );
};

const ApplicationStatusTracker = () => {
  const applications = [
    { id: 1, title: 'Frontend Developer', company: 'Company A', date: '2023-01-15', status: 'Interview Scheduled' },
    { id: 2, title: 'Backend Developer', company: 'Company B', date: '2023-02-10', status: 'Application Submitted' },
    // Add more application data as needed
  ];

  return (
    <section className="bg-gray-200 p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Your Applications</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {applications.map(app => (
          <div key={app.id} className="bg-white p-4 rounded-md shadow hover:shadow-lg cursor-pointer">
            <h3 className="font-bold">{app.title}</h3>
            <p>{app.company}</p>
            <p className="text-gray-500">{app.date}</p>
            <p className={`font-medium ${app.status === 'Interview Scheduled' ? 'text-green-500' : 'text-gray-800'}`}>{app.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>© 2023 Application Tracker. All rights reserved.</p>
      <ul className="flex justify-center space-x-4">
        <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
        <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
        <li><a href="#contact" className="hover:underline">Contact Us</a></li>
      </ul>
    </footer>
  );
};

export default ApplicationTracking;