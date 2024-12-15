import React from "react";

export const LoginModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-sm text-red-500 hover:text-red-700 font-semibold"
          >
            <img src="/assets/thin-exit.svg" alt="exit" className="w-7 h-7" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
