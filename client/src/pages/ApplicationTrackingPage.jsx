import React, { useState } from 'react';
import ApplicationStatusTracker from './ApplicationStatusTracker';
import WithdrawApplicationButton from './WithdrawApplicationButton';

const ApplicationTrackingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWithdraw = () => {
    // Logic to withdraw application goes here
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800">Application Tracking</h1>
      </header>
      <main className="flex-grow p-4 max-w-md mx-auto">
        <ApplicationStatusTracker />
        <WithdrawApplicationButton
          onClick={() => setIsModalOpen(true)}
          aria-label="Withdraw application"
        />
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold">Confirm Withdrawal</h2>
              <p>Are you sure you want to withdraw your application?</p>
              <div className="mt-4">
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleWithdraw}
                >
                  Yes, withdraw
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ApplicationTrackingPage;