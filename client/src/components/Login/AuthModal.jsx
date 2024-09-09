import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { LoginModal } from "./loginModal";
import { SigninForm } from "./SigninForm";
import { TermsAgreement } from "./TermsAgreement";

export const AuthModal = ({ isModalOpen, onClose }) => {
  const [currentForm, setCurrentForm] = useState("login");
  const [isAgreed, setIsAgreed] = useState(false);

  const switchToSignup = () => setCurrentForm("signup");
  const switchToLogin = () => setCurrentForm("login");

  return (
    <LoginModal isOpen={isModalOpen} onClose={onClose}>
      {currentForm === "login" ? (
        <LoginForm
          onClose={onClose}
          onSwitchToSignup={() => setCurrentForm("terms")}
        />
      ) : currentForm === "signup" ? (
        isAgreed ? (
          <SigninForm onClose={onClose} onSwitchToLogin={switchToLogin} />
        ) : (
          <TermsAgreement
            onAgree={() => {
              setIsAgreed(true);
              switchToSignup();
            }}
            onClose={() => {
              switchToLogin();
            }}
          />
        )
      ) : (
        <TermsAgreement
          onAgree={() => {
            setIsAgreed(true);
            switchToSignup();
          }}
          onClose={() => {
            switchToLogin();
          }}
        />
      )}
    </LoginModal>
  );
};
