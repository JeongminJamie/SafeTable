import React from "react";

export const LoginModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          닫기
        </button>
        {children}
      </div>
    </div>
  );
};
