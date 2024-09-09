import React from "react";

export const TableCard = () => {
  return (
    <div className="w-64 p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
      {/* 식당 이미지 */}
      <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden mb-4">
        <img src="" alt="" className="w-full h-full object-cover" />
      </div>

      {/* 식당 정보 */}
      <h3 className="text-xl font-semibold mb-2">dlfma</h3>
      <p className="text-gray-600 mb-3">dddd</p>

      {/* 평점 및 위치 */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-yellow-500 font-bold"> ★</span>
        <span className="text-gray-500 text-sm"></span>
      </div>

      {/* 버튼 */}
      <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
        자세히 보기
      </button>
    </div>
  );
};
