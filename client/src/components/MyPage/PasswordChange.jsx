import React from "react";

export const PasswordChange = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  passCheck,
  setPassCheck,
  passwordError,
  isPasswordValid,
  handleConfirmPasswordChange,
  handleFinalPasswordChange,
  isConfirming,
  setIsConfirming,
  closeModal,
}) => {
  return (
    <div>
      {!isConfirming ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>

          <div>
            <label htmlFor="currentPassword" className="block mb-1 text-sm">
              현재 비밀번호
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block mb-1 text-sm">
              새로운 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="6자리 이상 새로운 비밀번호를 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block mb-1 text-sm">
              새로운 비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={passCheck}
              onChange={(e) => setPassCheck(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="다시 입력하세요"
            />
          </div>
          <p
            className={`text-sm ${
              passCheck === ""
                ? "invisible"
                : passwordError
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {passCheck === ""
              ? ""
              : passwordError
              ? "비밀번호 불일치"
              : "비밀번호 일치"}
          </p>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              취소
            </button>
            <button
              onClick={handleConfirmPasswordChange}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              disabled={!isPasswordValid || passwordError}
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      ) : (
        // 확인 메시지
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">비밀번호 변경 확인</h2>
          <p>정말로 비밀번호를 변경하시겠습니까?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsConfirming(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              취소
            </button>
            <button
              onClick={handleFinalPasswordChange}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
