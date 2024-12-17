import React, { useEffect, useState } from "react";
import { AuthModal } from "../Login/AuthModal";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../config";

const MainHeader = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [token, setToken] = useState(null);

  const onLoginSuccess = (newToken) => {
    setToken(newToken);
    closeModal();
  };

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setToken(null);
    console.log("로그아웃 되었습니다.");
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10 w-10/12 px-3 py-3 bg-white flex flex-row justify-between items-center rounded-full text-center font-medium opacity-85 text-lg">
        <img
          src="/assets/logo.png"
          className="w-24 h-14 p-1 hover:cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex flex-row justify-around w-3/12 font-semibold">
          <div
            className="hover:cursor-pointer hover:text-xl"
            onClick={() => navigate("/safetable")}
          >
            식당찾기
          </div>
          <div
            className="hover:cursor-pointer hover:text-xl"
            onClick={() => navigate("/about")}
          >
            소개
          </div>

          {token ? (
            /* 로그인 했을 때 */
            <div
              className="hover:cursor-pointer hover:text-xl"
              onClick={() => navigate("/mypage")}
            >
              내정보
            </div>
          ) : (
            <div
              className="hover:cursor-pointer hover:text-xl"
              onClick={() => {
                setCurrentForm("signup");
                openModal();
              }}
            >
              회원가입
            </div>
          )}
        </div>
        {token ? (
          /* 로그인 했을 때 */
          <div
            className="w-28 bg-amber-200 rounded-full py-3 font-bold hover:cursor-pointer"
            onClick={() => {
              handleLogout();
            }}
          >
            로그아웃
          </div>
        ) : (
          <div
            className="w-28 bg-amber-200 rounded-full py-3 font-bold hover:cursor-pointer"
            onClick={() => {
              setCurrentForm("login");
              openModal();
            }}
          >
            로그인
          </div>
        )}
      </header>
      <main>
        <AuthModal
          isModalOpen={isModalOpen}
          onClose={closeModal}
          currentForm={currentForm}
          setCurrentForm={setCurrentForm}
          setToken={setToken}
          onLoginSuccess={onLoginSuccess}
        />
      </main>
    </>
  );
};

export default MainHeader;
