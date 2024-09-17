import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WithdrawApplicationButton = ({ applicationId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const history = useNavigate();

  const handleWithdraw = async () => {
    try {
      await axios.delete(`/api/applications/${applicationId}`);
      // Notify user of successful withdrawal and refresh
      history('/application-tracking');
    } catch (error) {
      // Handle error appropriately (e.g., show notification)
    }
  };

  return (
    <>
      <button
        className="bg-primaryButton text-white font-bold rounded-md min-w-[300px] w-[80%] px-3 py-3 hover:bg-lightPrimary transition-colors focus:outline-none focus:ring focus:ring-primaryButton"
        onClick={() => setIsDialogOpen(true)}
        aria-label="Withdraw Application"
      >
        Withdraw Application
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5">
            <p>Are you sure you want to withdraw your application?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md"
                onClick={() => {
                  handleWithdraw();
                  setIsDialogOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WithdrawApplicationButton;