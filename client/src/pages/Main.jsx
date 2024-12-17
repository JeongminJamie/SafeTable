import React from "react";
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

export default Main;
