import React, { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";
import useUserStore from "../../store/useUserStore";
import { LoginModal } from "../Login/loginModal";
import { getAxiosHeaderConfig } from "../../config";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const MyProfile = () => {
  const { userData, setUserData } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [localUserData, setLocalUserData] = useState(userData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passCheck, setPassCheck] = useState("");

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setLocalUserData(userData);
  }, [userData]);

  const passwordRef = useRef(newPassword);

  useEffect(() => {
    passwordRef.current = newPassword;
  }, [newPassword]);

  const checkPasswordMatch = useRef(
    debounce((value) => {
      if (value !== passwordRef.current) {
        setPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setPasswordError("");
      }
    }, 300)
  ).current;

  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPassCheck(value);
    checkPasswordMatch(value);
  };

  const updateProfile = async () => {
    const headersConfig = getAxiosHeaderConfig();
    if (!headersConfig) return;

    try {
      const response = await api.post(
        "http://localhost:8080/login/change-Profile",
        {
          newName: localUserData.userName,
          newContact: localUserData.userContact,
          newLocation: localUserData.userLocation,
        },
        headersConfig
      );
      console.log("Profile updated:", response.data);
      setUserData(localUserData);
    } catch (error) {
      if (error.response) {
        console.log("Failed to verify token:", error.response.data.message);
      } else {
        console.error("Error verifying token:", error.message);
      }
    }
  };

  const changePassword = async () => {
    try {
      const headersConfig = getAxiosHeaderConfig();
      if (!headersConfig) return;

      const response = await api.post(
        "http://localhost:8080/login/change-password",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        headersConfig
      );

      if (response.status !== 200) {
        console.error(response.data.message);
        return { success: false, message: response.data.message };
      }

      setCurrentPassword("");
      setNewPassword("");
      setPassCheck("");
      closeModal(); // 모달 닫기
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Error changing password:", error);
      return { success: false, message: "Error changing password" };
    }
  };

  // 전화번호 포맷팅 함수 3자리-4자리-4자리
  const formatPhoneNumber = (value) => {
    const onlyNumbers = value.replace(/\D/g, "");

    if (onlyNumbers.length <= 3) return onlyNumbers;
    if (onlyNumbers.length <= 8)
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(
      3,
      7
    )}-${onlyNumbers.slice(7, 11)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const formattedValue =
      name === "userContact" ? formatPhoneNumber(value) : value;

    setLocalUserData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSave = (e) => {
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

    updateProfile();
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <div className="mb-4">
            <label htmlFor="Name" className="block mb-1">
              Your Name
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {userData.userName}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-1">
              Contact
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {userData.userContact}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block mb-1">
              Location
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {userData.userLocation || "not location"}
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="w-1/5 h-10 bg-amber-200 m-auto px-2 py-1"
            >
              수정
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="Name" className="block mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="Name"
              name="userName"
              value={localUserData.userName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-1">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="userContact"
              value={localUserData.userContact}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Enter your contact"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="userLocation"
              value={localUserData.userLocation}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              placeholder="Enter your location"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-1/5 h-10 bg-amber-200 m-auto px-2 py-1"
            >
              저장
            </button>
          </div>
        </form>
      )}
      <div
        onClick={() => {
          openModal();
        }}
      >
        <p className="text-blue-500 underline hover:text-blue-700">
          비밀번호 바꾸기
        </p>
      </div>
      <LoginModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">비밀번호 변경</h2>

          <div>
            {/* onChange, value 없으니까 만들어야함. 새로운 비번이랑 비번 확인이 맞는지만 확인하고 나머지는 서버에서 */}
            <label htmlFor="currentPassword" className="block mb-1 text-sm">
              현재 비밀번호
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block mb-1 text-sm">
              새로운 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="6자리 이상 새로운 비밀번호를 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block mb-1 text-sm">
              새로운 비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={passCheck}
              onChange={handlePasswordCheckChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="다시 입력하세요"
            />
          </div>
          <p
            className={`text-sm ${
              passCheck === ""
                ? "invisible"
                : passwordError
                ? "text-red-500"
                : "text-green-500"
            } `}
          >
            {passCheck === ""
              ? ""
              : passwordError
              ? "비밀번호 불일치"
              : "비밀번호 일치"}
          </p>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              취소
            </button>
            <button
              onClick={() => changePassword()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              비밀번호 변경
            </button>
          </div>
        </div>
      </LoginModal>
    </div>
  );
};
