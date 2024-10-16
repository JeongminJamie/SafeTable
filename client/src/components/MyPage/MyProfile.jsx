import React, { useEffect, useState } from "react";
import { api } from "../../api/api";

export const MyProfile = ({ formData, setFormData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    userContact: "",
    userLocation: "",
  });

  useEffect(() => {
    setUserData({
      userName: formData.userName,
      userContact: formData.userContact,
      userLocation: formData.userLocation,
    });
  }, [formData]);

  const updateProfile = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("No access token found");
      return;
    }

    try {
      const response = await api.post(
        "http://localhost:8080/login/change-Profile",
        {
          newName: userData.userName,
          newContact: userData.userContact,
          newLocation: userData.userLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated:", response.data);
      setFormData(userData);
    } catch (error) {
      if (error.response) {
        console.log("Failed to verify token:", error.response.data.message);
      } else {
        console.error("Error verifying token:", error.message);
      }
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

    setUserData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (
      userData.userName === formData.userName &&
      userData.userContact === formData.userContact &&
      userData.userLocation === formData.userLocation
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
              {formData.userName}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-1">
              Contact
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {formData.userContact}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block mb-1">
              Location
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {formData.userLocation || "not location"}
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
              value={userData.userName}
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
              value={userData.userContact}
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
              value={userData.userLocation}
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
    </div>
  );
};
