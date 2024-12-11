import React from "react";

const InternalServerError = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <img
        src="/assets/error/internalerror.png"
        className="w-20 h-20"
        alt="500"
      />
       <p className="text-lg">서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
    </div>
  );
};

export default InternalServerError;
