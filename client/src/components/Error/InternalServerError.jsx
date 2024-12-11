import React from "react";

const InternalServerError = () => {
  return (
    <div className="flex flex-col justify-content align-center">
      <img
        src="/assets/error/internalerror.png"
        className="w-10 h-10"
        alt="500"
      />
      <p>서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
    </div>
  );
};

export default InternalServerError;
