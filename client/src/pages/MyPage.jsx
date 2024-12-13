import React, { useEffect, useState } from "react";
import { AboutMe } from "../components/MyPage/AboutMe";
import { Reservations } from "../components/MyPage/Reservations";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import MyCardInfo from "../components/Card/MyCardInfo";
import { useVerifyToken } from "../hooks/queries/auth";

const MyPage = () => {
  const navigate = useNavigate();
  const { userData } = useUserStore();
  const verifyToken = useVerifyToken();

  const [activeTab, setActiveTab] = useState("aboutMe");

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
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
