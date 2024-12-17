import React from "react";
import SaveTable from "./SaveTable";
import { MyProfile } from "./MyProfile";

export const AboutMe = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">내 정보</h2>
      <MyProfile />
      {/* 구분선 */}
      <div className="border-b border-gray-300 my-10 " />
      <h2 className="text-xl font-semibold mb-4">찜한 식당</h2>
      <SaveTable />
    </div>
  );
};
