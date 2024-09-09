import React, { useState } from "react";

export const TermsAgreement = ({ onAgree, onClose }) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
  const [isAgeChecked, setIsAgeChecked] = useState(false);

  const handleAllChecked = () => {
    setIsAllChecked(!isAllChecked);
    setIsTermsChecked(!isAllChecked);
    setIsPrivacyChecked(!isAllChecked);
    setIsAgeChecked(!isAllChecked);
  };

  const isFormValid = isTermsChecked && isPrivacyChecked && isAgeChecked;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">약관 동의</h2>

      <div>
        <div className="mb-4">
          <label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isAllChecked}
              onChange={handleAllChecked}
            />
            <span className="font-bold">
              이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
            </span>
          </label>
        </div>

        <div className="mt-5 mb-2">
          <label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
              required
            />
            <span className="font-bold">이용약관 동의 (필수)</span>
          </label>
          <div
            className="mt-2 p-2 border border-gray-300 rounded-md"
            style={{
              height: "100px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            이 약관동의 어쩌구 어쩌구... <br />
            약관 내용이 길 경우 이 약관동의 어쩌구 어쩌구... <br />
            약관 내용이 길 경우 이 약관동의 어쩌구 어쩌구... <br />
            약관 내용이 길 경우 이 약관동의 어쩌구 어쩌구... 약관 내용이 길 경우
            이 약관동의 어쩌구 어쩌구... 약관 내용이 길 경우 이 약관동의 어쩌구
            어쩌구... 약관 내용이 길 경우 이 약관동의 어쩌구 어쩌구... 약관
            내용이 길 경우 이 약관동의 어쩌구 어쩌구...
          </div>
        </div>

        <div className="mt-5 mb-2">
          <label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isPrivacyChecked}
              onChange={(e) => setIsPrivacyChecked(e.target.checked)}
              required
            />
            <span className="font-bold">개인정보 수집 및 이용 동의 (필수)</span>
          </label>
          <div
            className="mt-2 p-2 border border-gray-300 rounded-md"
            style={{
              height: "100px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            이 약관동의 어쩌구 어쩌구... <br />
            약관 내용이 길 경우 이 약관동의 어쩌구 어쩌구... <br />
            약관 내용이 길 경우 이 약관동의 어쩌구 어쩌구... <br />
            약관 내용이 길 경우 이 약관동의 어쩌구 어쩌구... 약관 내용이 길 경우
            이 약관동의 어쩌구 어쩌구... 약관 내용이 길 경우 이 약관동의 어쩌구
            어쩌구... 약관 내용이 길 경우 이 약관동의 어쩌구 어쩌구... 약관
            내용이 길 경우 이 약관동의 어쩌구 어쩌구...
          </div>
        </div>

        <div className="mb-8 mt-4">
          <label>
            <input
              type="checkbox"
              className="mr-1"
              checked={isAgeChecked}
              onChange={(e) => setIsAgeChecked(e.target.checked)}
              required
            />
            <span className="font-bold">만 14세 이상입니다. (필수)</span>
          </label>
        </div>
      </div>

      <div className="flex justify-around">
        <button
          onClick={onClose}
          className="px-20 py-4 border border-gray-300 rounded ml-2"
        >
          취소
        </button>
        <button
          onClick={() => {
            if (isFormValid) {
              onAgree();
            }
          }}
          className={`px-20 py-4 ${
            isFormValid ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
          } rounded hover:${isFormValid ? "bg-blue-600" : ""}`}
          disabled={!isFormValid}
        >
          동의
        </button>
      </div>
    </div>
  );
};
