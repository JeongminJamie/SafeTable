import React from "react";

const MainHeader = () => {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10 w-9/12 px-3 py-3 bg-white flex flex-row justify-between items-center rounded-full text-center font-medium opacity-85 text-lg">
      <div className="w-2/12 font-bold">안심테이블</div>
      <div className="flex flex-row justify-around w-3/12 font-semibold">
        <div className="hover:cursor-pointer">식당찾기</div>
        <div className="hover:cursor-pointer">소개</div>
        <div className="hover:cursor-pointer">내정보</div>
        <div className="hover:cursor-pointer">회원가입</div>
      </div>
      <div className="w-28 bg-amber-200 rounded-full py-3 font-bold hover:cursor-pointer">
        로그인
      </div>
    </header>
  );
};

export default MainHeader;
