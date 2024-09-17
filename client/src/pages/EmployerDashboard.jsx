import React, { useState } from 'react';
import JobPostingForm from '../components/JobPostingForm';
import JobListingManager from '../components/JobListingManager';
import JobPostSuccessNotification from '../components/JobPostSuccessNotification';

const EmployerDashboard = () => {
  const [notificationVisible, setNotificationVisible] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow fixed w-full">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <img src="/logo.png" alt="Company Logo" className="h-10" />
          <h1 className="text-lg font-bold">Employer Dashboard</h1>
        </div>
      </header>

      <main className="mt-16 flex flex-col flex-1 container mx-auto px-4">
        {notificationVisible && (
          <JobPostSuccessNotification onDismiss={() => setNotificationVisible(false)} />
        )}
        
        <section className="flex flex-col lg:flex-row">
          <div className="flex-1 mb-4">
            <JobPostingForm onSuccess={() => setNotificationVisible(true)} />
          </div>
          <div className="flex-1">
            <JobListingManager />
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 py-4 text-center">
        <div className="container mx-auto">
          <a href="/privacy" className="text-gray-600">Privacy Policy</a> | 
          <a href="/terms" className="text-gray-600">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default EmployerDashboard;