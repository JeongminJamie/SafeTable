import React, { useEffect, useState } from "react";
import { AboutMe } from "../components/MyPage/AboutMe";
import { Reservations } from "../components/MyPage/Reservations";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import MyCardInfo from "../components/Card/MyCardInfo";

const MyPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserStore();

  const [activeTab, setActiveTab] = useState("aboutMe");

  const verifyToken = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("No access token found");
      return;
    }

    try {
      const response = await api.get("/login/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData({
        userName: response.data.user.name,
        userEmail: response.data.user.email,
        userContact: response.data.user.contact,
        userLocation: response.data.user.location,
      });
    } catch (error) {
      if (error.response) {
        console.log("Failed to verify token:", error.response.data.message);
      } else {
        console.error("Error verifying token:", error.message);
      }
    }
  };

  // To-do: 로그인이 필요한 모든 페이지에 token 확인 하기!!
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
    verifyToken();
  }, []);

  return (
    <div className="mx-28 my-10">
      {/* 프로필 */}
      <div className="ml-28 mb-8 flex items-center gap-4">
        <img
          src="./assets/user.png"
          alt="Profile"
          className="w-20 h-20 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">{userData.userName}</h1>
          <p>{userData.userEmail}</p>
          <p>{userData.userLocation}</p>
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-b border-gray-300 mb-4"></div>

      <div className="flex mx-16 mt-10 gap-10">
        {/* 네비게이션탭 */}
        <nav className="flex flex-col w-1/5 gap-3">
          <div
            className={`cursor-pointer text-lg ${
              activeTab === "aboutMe" ? "font-bold" : "font-normal"
            } flex items-center relative`}
            onClick={() => setActiveTab("aboutMe")}
          >
            About Me
          </div>
          <div
            className={`cursor-pointer text-lg ${
              activeTab === "Reservations" ? "font-bold" : "font-normal"
            } flex items-center relative`}
            onClick={() => setActiveTab("Reservations")}
          >
            Reservations
          </div>
          <div
            className={`cursor-pointer text-lg ${
              activeTab === "Payment Methods" ? "font-bold" : "font-normal"
            } flex items-center relative`}
            onClick={() => setActiveTab("Payment Methods")}
          >
            Payment Method
          </div>
        </nav>

        {/* Main 부분 */}
        <div className="w-4/5">
          {activeTab === "aboutMe" && <AboutMe />}
          {activeTab === "Reservations" && <Reservations />}
          {activeTab === "Payment Methods" && <MyCardInfo />}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
