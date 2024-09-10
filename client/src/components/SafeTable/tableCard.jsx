import React from "react";

export const TableCard = () => {
  return (
    <div className="w-64 p-3 border border-gray-300 rounded-lg bg-white transition-transform transform hover:scale-103 hover:cursor-pointer">
      <div className="w-full h-32 bg-gray-200 rounded-lg overflow-hidden mb-4">
        <img src="" alt="식당 이미지" className="w-full h-full object-cover" />
      </div>
      <h1 className="text-base font-semibold mb-2 text-gray-800">식당 이름</h1>
      <p className="text-sm text-gray-600 mb-3">서울시 땡땡동 123-45</p>
      <div className="flex justify-between space-x-2 mb-4">
        <button className="flex-1 bg-gray-200 text-gray-700 py-1 rounded hover:bg-gray-300">
          9:00 AM
        </button>
        <button className="flex-1 bg-gray-200 text-gray-700 py-1 rounded hover:bg-gray-300">
          12:00 PM
        </button>
        <button className="flex-1 bg-gray-200 text-gray-700 py-1 rounded hover:bg-gray-300">
          7:00 PM
        </button>
      </div>
      <button className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600">
        자세히 보기
      </button>
    </div>
  );
};
