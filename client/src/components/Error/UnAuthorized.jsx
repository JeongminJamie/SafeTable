import React from "react";

const UnAuthorized = () => {
  return (
    <div className="flex flex-col justify-content align-center">
      <img
        src="/assets/error/unauthorized.png"
        className="w-10 h-10"
        alt="401"
      />
      <p>로그인이 필요합니다. 인증 후 다시 시도해주세요.</p>
    </div>
  );
};

export default UnAuthorized;
