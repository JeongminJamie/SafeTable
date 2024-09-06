import React, { useState } from "react";
import { LoginModal } from "../components/Login/loginModal";
import { LoginForm } from "../components/Login/LoginForm";
import { SignupForm } from "../components/Login/SigninForm";
import { TermsAgreement } from "../components/Login/TermsAgreement";

const Main = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [isAgreed, setIsAgreed] = useState(false); // 약관 동의

  const openModal = () => {
    setModalOpen(true);
    setCurrentForm("login");
    setIsAgreed(false);
  };

  const closeModal = () => setModalOpen(false);

  const switchToSignup = () => {
    setCurrentForm("signup");
  };

  const switchToLogin = () => setCurrentForm("login");

  return (
    <div>
      <button
        onClick={openModal}
        className="px-4 py-2 border border-slate-900 rounded"
      >
        로그인
      </button>

      {/* 로그인 모달*/}
      <LoginModal isOpen={isModalOpen} onClose={closeModal}>
        {currentForm === "login" ? (
          <LoginForm
            onClose={closeModal}
            onSwitchToSignup={() => setCurrentForm("terms")}
          />
        ) : currentForm === "signup" ? (
          isAgreed ? (
            <SignupForm onClose={closeModal} onSwitchToLogin={switchToLogin} />
          ) : (
            <TermsAgreement
              onAgree={() => {
                setIsAgreed(true);
                switchToSignup();
              }}
              onClose={closeModal}
            />
          )
        ) : (
          <TermsAgreement
            onAgree={() => {
              setIsAgreed(true);
              switchToSignup();
            }}
            onClose={closeModal}
          />
        )}
      </LoginModal>
    </div>
  );
};

export default Main;
