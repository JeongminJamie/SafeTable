import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <img src="/assets/error/404.png" className="w-20 h-20" alt="404" />
      <p className="text-lg">
        요청하신 페이지를 찾을 수 없습니다. 주소가 올바른지 확인해주세요.
      </p>
    </div>
  );
};

export default NotFound;
