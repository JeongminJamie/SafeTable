import React, { useState } from "react";
import { AuthModal } from "../Login/AuthModal";
import { useNavigate } from "react-router-dom";

const MainHeader = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleClick = () => {
    navigate("/safetable");
  };
  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10 w-10/12 px-3 py-3 bg-white flex flex-row justify-between items-center rounded-full text-center font-medium opacity-85 text-lg">
        <div className="w-2/12 font-bold">안심테이블</div>
        <div className="flex flex-row justify-around w-3/12 font-semibold">
          <div
            className="hover:cursor-pointer hover:text-xl"
            onClick={() => navigate("/safetable")}
          >
            식당찾기
          </div>
          <div
            className="hover:cursor-pointer hover:text-xl"
            onClick={() => navigate("/reservation")}
          >
            소개
          </div>
          {/* 로그인 했을 때 */}
          {/* <div className="hover:cursor-pointer hover:text-xl">내정보</div> */}
          <div className="hover:cursor-pointer hover:text-xl">회원가입</div>
        </div>
        <div
          className="w-28 bg-amber-200 rounded-full py-3 font-bold hover:cursor-pointer"
          onClick={openModal}
        >
          로그인
        </div>
        {/* 로그인 했을 때 */}
        {/* <div className="w-28 bg-amber-200 rounded-full py-3 font-bold hover:cursor-pointer">
        로그아웃
      </div> */}
      </header>
      <main>
        <AuthModal isModalOpen={isModalOpen} onClose={closeModal} />
      </main>
    </>
  );
};

export default MainHeader;
