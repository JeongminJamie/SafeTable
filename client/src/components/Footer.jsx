import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center bg-black text-white p-4 gap-5">
      <div className="flex flex-row gap-10 text-lg">
        <Link to="/" className="hover:font-semibold">
          Home
        </Link>
        <Link to="" className="hover:font-semibold">
          Reserve
        </Link>
        <Link to="/about" className="hover:font-semibold">
          About
        </Link>
      </div>
      <div className="flex flex-row gap-10">
        <a
          href="https://github.com/SafeTable-FS/SafeTable"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/github.png"
            alt="github"
            className="w-12 max-h-12 cursor-pointer"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/jeongmin-choi-43508a20a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/assets/linkedin1.png"
            alt="linkedin1"
            className="w-12 max-h-12 cursor-pointer"
          />
        </a>
        <a>
          <img
            src="/assets/linkedin2.png"
            alt="linkedin2"
            className="w-12 max-h-12 cursor-pointer"
          />
        </a>
        <a>
          <img
            src="/assets/notion.png"
            alt="notion"
            className="w-12 max-h-12 cursor-pointer"
          />
        </a>
      </div>
      <p className="flex flex-row">
        Copyright
        <img
          src="/assets/copyright.png"
          alt="copyright"
          className="w-5 mr-1 ml-1"
        />
        2024. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
