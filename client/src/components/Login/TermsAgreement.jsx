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
            className="mt-3 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600 leading-relaxed"
            style={{
              height: "100px",
              overflowY: "auto",
            }}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                본 서비스는 이용자의 개인정보를 안전하게 보호하며, 제공된 정보는
                회원 관리 및 서비스 개선 목적으로만 사용됩니다.
              </li>
              <li>
                이용자는 본 약관에 따라 서비스 사용 권한을 가지며, 타인의 권리를
                침해하거나 불법 행위를 해서는 안 됩니다.
              </li>
              <li>
                서비스 이용 중 발생하는 데이터 손실이나 문제에 대해 회사는 법적
                책임을 지지 않습니다.
              </li>
            </ul>
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
            className="mt-3 p-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600 leading-relaxed"
            style={{
              height: "100px",
              overflowY: "auto",
            }}
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>수집 항목:</strong> 이름, 이메일, 휴대폰 번호, 생년월일
                등
              </li>
              <li>
                <strong>이용 목적:</strong> 회원 관리, 맞춤형 서비스 제공, 법적
                의무 이행
              </li>
              <li>
                <strong>보관 기간:</strong> 회원 탈퇴 시까지 또는 관련 법령에
                따른 보관 기간 준수
              </li>
              <li>
                <strong>제3자 제공:</strong> 이용자의 사전 동의 없이 개인정보를
                외부에 제공하지 않습니다
              </li>
            </ul>
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
            isFormValid
              ? "bg-amber-500 text-white"
              : "bg-gray-300 text-gray-600"
          } rounded hover:${isFormValid ? "bg-amber-600" : ""}`}
          disabled={!isFormValid}
        >
          동의
        </button>
      </div>
    </div>
  );
};
