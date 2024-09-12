import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
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
        {/* 로그인 하지 않았을 때 */}
        <button className="w-24 bg-header-signup-background rounded-full py-2.5 font-medium text-base">
          회원가입
        </button>
        <button className="w-24 bg-amber-200 rounded-full py-2.5 font-medium text-base">
          로그인
        </button>
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
  );
};

export default Header;
