import React, { useState } from "react";
import { LoginModal } from "../components/Login/loginModal";
import { LoginForm } from "../components/Login/LoginForm";
import { SignupForm } from "../components/Login/SigninForm";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // 로그인 < - > 회원가입 폼 전환
  const switchToSignup = () => setCurrentForm("signup");
  const switchToLogin = () => setCurrentForm("login");

  return (
    <div>
      <button
        onClick={() => {
          openModal();
          switchToLogin(); // 기본이 로그인 폼
        }}
        className="px-4 py-2 border border-slate-900 rounded"
      >
        로그인
      </button>

      <LoginModal isOpen={isModalOpen} onClose={closeModal}>
        {currentForm === "login" ? (
          <LoginForm onClose={closeModal} onSwitchToSignup={switchToSignup} />
        ) : (
          <SignupForm onClose={closeModal} onSwitchToLogin={switchToLogin} />
        )}
      </LoginModal>
    </div>
  );
}

export default App;
