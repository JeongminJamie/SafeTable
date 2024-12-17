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
        <div className="flex flex-col gap-7">
          <div>
            <label htmlFor="Name" className="block mb-1">
              이름
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {userData.userName}
            </p>
          </div>
          <div>
            <label htmlFor="contact" className="block mb-1">
              전화번호
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {userData.userContact}
            </p>
          </div>

          <div>
            <label htmlFor="location" className="block mb-1">
              지역
            </label>
            <p className="border p-2 rounded bg-gray-100">
              {userData.userLocation || "No Location"}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setIsEditing(true)}
              className="w-36 h-10 rounded text-slate-100 bg-amber-400 m-auto px-2 py-1 hover:bg-amber-500"
            >
              수정
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="Name" className="block mb-1">
              이름
            </label>
            <input
              type="text"
              id="Name"
              name="userName"
              value={localUserData.userName}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact" className="block mb-1">
              전화번호
            </label>
            <input
              type="text"
              id="contact"
              name="userContact"
              value={localUserData.userContact}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter your contact"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-1">
              지역
            </label>
            <input
              type="text"
              id="location"
              name="userLocation"
              value={localUserData.userLocation}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              placeholder="Enter your location"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-36 h-10 rounded text-white bg-amber-400 m-auto px-2 py-1 hover:bg-amber-500"
            >
              저장
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
