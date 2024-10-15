import React, { useEffect, useState } from "react";
import { AboutMe } from "../components/MyPage/AboutMe";
import { Reservations } from "../components/MyPage/Reservations";
import MyCardInfo from "../components/Card/MyCardInfo";
import NoCard from "../components/Card/NoCard";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userContact: "",
    userLocation: "",
  });
  console.log("🚀 ~ MyPage ~ userData:", userData);
  const [activeTab, setActiveTab] = useState("aboutMe");

  const verifyToken = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("No access token found");
      return;
    }

    try {
      const response = await api.get("http://localhost:8080/login/verify", {
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

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/");
    }
    verifyToken();
  }, []);

  const reservations = [
    {
      id: 1,
      restaurant: "Restaurant E",
      people: 2,
      date: "2023-12-25",
      location: "서울",
      time: "18:30",
    },
    {
      id: 2,
      restaurant: "Restaurant B",
      people: 2,
      date: "2024-09-12",
      location: "부산",
      time: "12:00",
    },
    {
      id: 3,
      restaurant: "Restaurant A",
      people: 4,
      date: "2024-09-15",
      location: "인천",
      time: "19:00",
    },
    {
      id: 4,
      restaurant: "Restaurant F",
      people: 4,
      date: "2024-09-17",
      location: "대구",
      time: "20:30",
    },
    {
      id: 5,
      restaurant: "Restaurant C",
      people: 3,
      date: "2024-09-20",
      location: "서울",
      time: "17:00",
    },
    {
      id: 6,
      restaurant: "Restaurant D",
      people: 5,
      date: "2024-10-05",
      location: "광주",
      time: "13:00",
    },
    {
      id: 7,
      restaurant: "Restaurant G",
      people: 1,
      date: "2024-10-15",
      location: "대전",
      time: "18:00",
    },
  ];

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
          <p>등록한 위치</p>
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
          {activeTab === "aboutMe" && (
            <AboutMe formData={userData} setFormData={setUserData} />
          )}
          {activeTab === "Reservations" && (
            <Reservations reservations={reservations} />
          )}
          {activeTab === "Payment Methods" && <MyCardInfo />}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
