import React, { useState } from "react";

const SafeTableDetail = () => {
  // 예약된 테이블 수 상태 관리
  const [reservedTables, setReservedTables] = useState(5); // 예시로 5개의 테이블이 예약된 상태

  // 저장 버튼 클릭 이벤트 핸들러
  const handleSaveRestaurant = () => {
    alert("식당이 저장되었습니다!");
    // 여기서 식당 정보를 저장하는 로직을 추가할 수 있습니다.
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 mb-20">
      {/* 이미지 섹션 */}
      <div className="relative w-full h-64 md:h-72 lg:h-80 bg-gray-200 rounded-lg mb-6 overflow-hidden">
        <img
          src="사진링크"
          alt="안심식당"
          className="w-full h-full object-cover"
        />
        {/* 저장 버튼 */}
        <button
          onClick={handleSaveRestaurant}
          className="flex items-center justify-center absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-lg space-x-2"
        >
          <img
            src="./assets/save-icon.svg"
            className="w-7 h-7"
            alt="저장 아이콘"
          />
          <span className="text-sm md:text-base">식당 저장</span>
        </button>
      </div>

      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              안심갈비식당
            </h2>
            <p className="text-base md:text-lg font-medium text-gray-600 mt-1">
              한식
            </p>
          </div>
          {/* 예약하러 가기 버튼 및 예약된 테이블 수 */}
          <div className="flex flex-col items-end">
            <a
              href="#"
              className="flex items-center text-base md:text-lg font-medium text-gray-700 hover:text-blue-500 cursor-pointer transition-colors bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 mb-2"
            >
              예약하러 가기
            </a>
            <p className="font-semibold text-gray-800 flex items-center">
              <span className="mr-1">Booked</span>
              <span className="text-blue-600 font-bold mx-1">
                {reservedTables}
              </span>
              <span className="ml-1">times today</span>
            </p>
          </div>
        </div>

        <nav className="border-b border-gray-300 mb-6" />

        <div className="space-y-4 text-sm md:text-base mb-6">
          {/* 상세 정보 */}
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">시도명:</span>
            <span className="text-gray-500">서울특별시</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">시군구명:</span>
            <span className="text-gray-500">강남구</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">대표자명:</span>
            <span className="text-gray-500">홍길동</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">안심식당지정일:</span>
            <span className="text-gray-500">2023-09-11</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">주소:</span>
            <span className="text-gray-500">서울시 강남구 역삼동 123-45</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">전화번호:</span>
            <span className="text-gray-500">02-123-4567</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">
              비고(웹사이트등):
            </span>
            <span className="text-gray-500">www.safe-restaurant.com</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">선정여부:</span>
            <span className="text-green-500 font-medium">선정됨</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafeTableDetail;
