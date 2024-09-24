import React from "react";

const SearchBox = () => {
  return (
    <div className="flex justify-center items-center w-4/12 h-12 border border-gray-500 rounded-full mx-auto my-14 p-4">
      <input
        className="w-full focus:outline-none
        placeholder:font-medium placeholder:text-center"
        placeholder="지역 검색"
      ></input>
      <img
        src="/assets/safeTable/search.png"
        alt="search"
        className="w-7 h-7 hover:cursor-pointer"
      />
    </div>
  );
};

export default SearchBox;
