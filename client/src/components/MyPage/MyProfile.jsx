import React, { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore";
import { LoginModal } from "../Login/loginModal";
import { useDebounce } from "../../hooks/useDebounce";
import { ProfileInfo } from "./ProfileInfo";
import { PasswordChange } from "./PasswordChange";
import { changePassword, updateProfile } from "../../service/myProfileService";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";

export const MyProfile = () => {
  const { userData, setUserData } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [localUserData, setLocalUserData] = useState(userData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passCheck, setPassCheck] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setLocalUserData(userData);
  }, [userData]);

  const debouncedCheckPassword = useDebounce((password, confirmPassword) => {
    if (password.length >= 6) {
      setPasswordError(password !== confirmPassword);
    }
  }, 200);

  useEffect(() => {
    const isValid = newPassword.length >= 6;
    setIsPasswordValid(isValid);

    if (isValid) {
      debouncedCheckPassword(newPassword, passCheck);
    }
  }, [newPassword, passCheck, debouncedCheckPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "userContact" ? formatPhoneNumber(value) : value;

    setLocalUserData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (
      localUserData.userName === userData.userName &&
      localUserData.userContact === userData.userContact &&
      localUserData.userLocation === userData.userLocation
    ) {
      console.log("바뀐데이터가 없습니다");
      setIsEditing(false);
      return;
    }

    const result = await updateProfile(localUserData);
    if (result.success) {
      setUserData(localUserData);
    } else {
      console.error(result.message);
    }
    setIsEditing(false);
  };

  const handleConfirmPasswordChange = () => {
    setIsConfirming(true);
  };

  const handleFinalPasswordChange = async () => {
    const result = await changePassword(currentPassword, newPassword);
    if (result.success) {
      setIsConfirming(false);
      closeModal();
    } else {
      console.error(result.message);
    }
  };

  return (
    <div>
      <ProfileInfo
        userData={userData}
        localUserData={localUserData}
        onChange={handleChange}
        isEditing={isEditing}
        onSave={handleSave}
        setIsEditing={setIsEditing}
        handleSave={handleSave}
        handleChange={handleChange}
      />
      <div
        onClick={() => {
          openModal();
        }}
        className="flex justify-end"
      >
        <p className="text-blue-500 underline hover:text-blue-700 hover:cursor-pointer mt-3">
          비밀번호 바꾸기
        </p>
      </div>
      <LoginModal isOpen={isModalOpen} onClose={closeModal}>
        <PasswordChange
          currentPassword={currentPassword}
          setCurrentPassword={setCurrentPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          passCheck={passCheck}
          setPassCheck={setPassCheck}
          passwordError={passwordError}
          isPasswordValid={isPasswordValid}
          handleConfirmPasswordChange={handleConfirmPasswordChange}
          handleFinalPasswordChange={handleFinalPasswordChange}
          isConfirming={isConfirming}
          setIsConfirming={setIsConfirming}
          closeModal={closeModal}
        />
      </LoginModal>
    </div>
  );
};
