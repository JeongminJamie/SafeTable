import React from "react";

export const TermsAgreement = ({ onAgree, onClose }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">약관 동의</h2>
      <p className="mb-4">이용 약관에 동의?</p>
      <div className="flex justify-end">
        <button
          onClick={() => {
            onAgree();
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          동의
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded ml-2"
        >
          취소
        </button>
      </div>
    </div>
  );
};
