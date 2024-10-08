import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthModal } from "./Login/AuthModal";

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const token = sessionStorage.getItem("token");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center text-lg font-medium px-12 py-7">
        <div className="flex flex-row justify-around w-1/6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-amber-500 font-bold" : "text-black"
            }
          >
            홈
          </NavLink>
          <NavLink
            to="/safetable"
            className={({ isActive }) =>
              isActive ? "text-amber-500 font-bold" : "text-black"
            }
          >
            식당찾기
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-amber-500 font-bold" : "text-black"
            }
          >
            소개
          </NavLink>
        </div>
        <div className="w-1/6 text-center">안심테이블</div>
        <div className="flex flex-row items-center gap-7">
          {token ? (
            <>
              <button
                className="w-24 bg-header-signup-background rounded-full py-2.5 font-medium text-base"
                onClick={() => {
                  setCurrentForm("signup");
                  openModal();
                }}
              >
                회원가입
              </button>
              <button
                className="w-24 bg-amber-200 rounded-full py-2.5 font-medium text-base"
                onClick={() => {
                  setCurrentForm("login");
                  openModal();
                }}
              >
                로그인
              </button>
            </>
          ) : (
            <NavLink
              to="/mypage"
              className={({ isActive }) =>
                isActive ? "text-amber-500 font-bold" : "text-black"
              }
            >
              마이페이지
            </NavLink>
          )}

          {/* 로그인 했을 때 */}
          {/* <img
          src="/assets/user.png"
          alt="user"
          className="w-8 h-8 hover:cursor-pointer"
        ></img> */}
          {/* <button className="w-24 bg-amber-200 rounded-full py-2.5 font-medium">
          로그아웃
        </button> */}
        </div>
      </div>
      <AuthModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
      />
    </>
  );
};

export default Header;
