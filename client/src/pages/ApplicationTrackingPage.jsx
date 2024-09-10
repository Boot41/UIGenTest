import React from 'react';

const ApplicationTrackingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Component */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="text-lg font-bold">Site Logo</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#home" className="text-blue-500">Home</a></li>
              <li><a href="#about" className="text-blue-500">About</a></li>
              <li><a href="#contact" className="text-blue-500">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-16">
        <div className="max-w-7xl mx-auto p-4">
          <ApplicationStatusTracker />
        </div>
      </main>

      {/* Footer Component */}
      <footer className="bg-blue-800 text-white py-4">
        <div className="max-w-7xl mx-auto text-center">
          &copy; 2023 Your Company. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

// Application Status Tracker Component
const ApplicationStatusTracker = () => {
  const applications = [
    { id: 1, status: "Applied", date: "2023-10-01" },
    { id: 2, status: "Interview", date: "2023-10-05" },
    { id: 3, status: "Offer", date: "2023-10-10" },
    { id: 4, status: "Rejected", date: "2023-10-12" },
    // Add more applications as needed
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {applications.map((app) => (
        <div
          key={app.id}
          className="border rounded shadow hover:shadow-lg p-4 transition-shadow"
          role="article"
          aria-labelledby={`app-${app.id}`}
        >
          <h2 id={`app-${app.id}`} className="font-bold">{`Application ${app.id}`}</h2>
          <p>{`Status: ${app.status}`}</p>
          <p>{`Date Submitted: ${app.date}`}</p>
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
            aria-label={`Request update for application ${app.id}`}
            onClick={() => alert(`Request update for Application ${app.id}`)} // Placeholder for modal trigger
          >
            Request Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default ApplicationTrackingPage;