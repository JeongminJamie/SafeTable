import React from "react";

export const ProfileInfo = ({
  userData,
  localUserData,
  isEditing,
  setIsEditing,
  handleSave,
  handleChange,
}) => {
  return (
    <div>
      {!isEditing ? (
        <div>
          <div className="mb-4">
            <label htmlFor="Name" className="block mb-1">
              Your Name
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {userData.userName}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-1">
              Contact
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {userData.userContact}
            </p>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block mb-1">
              Location
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {userData.userLocation || "not location"}
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
              value={localUserData.userName}
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
              value={localUserData.userContact}
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
              value={localUserData.userLocation}
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
