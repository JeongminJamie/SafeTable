import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "../components/Main/MainHeader";
import HeroSection from "../components/Main/HeroSection";
import RestaurantsSection from "../components/Main/RestaurantsSection";
import VideoSection from "../components/Main/VideoSection";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div className="relative h-screen bg-main-background">
      <MainHeader />
      <HeroSection />
      <RestaurantsSection />
      <VideoSection />
      <Footer />
    </div>
  );
};

//연희님 코드
{
  /* const Main = () => {
  return (
    <div>
      <h1>Main Page</h1>
      {/* 컴포넌트로 수정하기 */
}
{
  /* <Link to="/login">로그인</Link>
    </div>
  );
} */
}

export default Main;
