import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-content align-center">
      <img src="/assets/error/404.png" className="w-10 h-10" alt="404" />
      <p>요청하신 페이지를 찾을 수 없습니다. 주소가 올바른지 확인해주세요.</p>
    </div>
  );
};

export default NotFound;
