import React from "react";

const UnAuthorized = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <img
        src="/assets/error/unauthorized.png"
        className="w-20 h-20"
        alt="401"
      />
      <p className="text-lg">로그인이 필요합니다. 인증 후 다시 시도해주세요.</p>
    </div>
  );
};

export default UnAuthorized;
