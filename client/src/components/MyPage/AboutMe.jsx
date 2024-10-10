import React from "react";
import SaveTable from "./SaveTable";

export const AboutMe = ({ formData, handleChange }) => {
  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">About Me</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label htmlFor="Name" className="block mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-2 rounded w-4/5"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.emailAddress}
            onChange={handleChange}
            className="border p-2 rounded w-4/5"
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded w-4/5"
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
      {/* 구분선 */}
      <div className="border-b border-gray-300 my-10 " />
      <h2 className="text-xl font-semibold mb-4">찜한 식당</h2>
      <SaveTable />
    </div>
  );
};
