import React from "react";

const Forbidden = () => {
  return (
    <div className="flex flex-col justify-content align-center">
      <img src="/assets/error/forbidden.png" className="w-10 h-10" alt="403" />
      <p>
        이 페이지에 접근할 권한이 없습니다. 로그인 상태나 권한을 확인해주세요.
      </p>
    </div>
  );
};

export default Forbidden;
