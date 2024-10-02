import React from "react";

export const SigninValue = () => {
  return (
    <>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="password"
        >
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>
      <div className="mb-4 relative">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="passwordCheck"
        >
          비밀번호 확인
        </label>
        <input
          type="password"
          id="passwordCheck"
          value={passCheck}
          onChange={handlePasswordCheckChange}
          className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
        <p
          className={`text-sm ${
            passwordError ? "text-red-500" : "text-green-500"
          } absolute bottom-3.5 right-3`}
        >
          {passwordError ? "비밀번호 불일치" : "비밀번호 일치"}
        </p>
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="name"
        >
          이름
        </label>
        <input
          type="text"
          id="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="이름을 입력하세요"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="phone"
        >
          연락처
        </label>
        <input
          type="tel"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="연락처를 입력하세요"
          required
        />
      </div>
    </>
  );
};
