import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "../components/mainHeader";
import HeroSection from "../components/HeroSection";

const Main = () => {
  return (
    <div className="relative h-screen">
      <MainHeader />
      <HeroSection />
    </div>
  );
};

export default Main;
