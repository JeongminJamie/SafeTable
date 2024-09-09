import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-black text-white p-2 gap-5">
      <div className="flex flex-row gap-10 text-lg">
        <div>Home</div>
        <div>Reserve</div>
        <div>About</div>
      </div>
      <div className="flex flex-row gap-10">
        <img
          src="/assets/github.png"
          className="w-12 h-12 cursor-pointer"
        ></img>
        <img
          src="/assets/linkedin1.png"
          className="w-12 h-12 cursor-pointer"
        ></img>
        <img
          src="/assets/linkedin2.png"
          className="w-12 h-12 cursor-pointer"
        ></img>
        <img
          src="/assets/notion.png"
          className="w-12 h-12 cursor-pointer"
        ></img>
      </div>
      <p>Copyright 2024. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
