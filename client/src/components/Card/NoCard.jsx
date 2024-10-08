import React, { useState, useEffect } from "react";
import AddCard from "./AddCard";

const NoCard = () => {
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  useEffect(() => {
    setIsRegisterClicked(false);
  }, []);
  
  return (
    <>
      {isRegisterClicked ? (
        <div className="px-10 py-0 mx-5 mb-5 flex flex-col justify-center ">
          <AddCard />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-24 mx-20 gap-5">
          <img src="/assets/empty.png" alt="empty" className="w-24 h-24" />
          <div className="font-medium text-lg">등록된 카드가 없습니다</div>
          <button
            className="rounded font-medium w-3/12 h-11 bg-amber-500 text-white m-auto"
            onClick={() => setIsRegisterClicked(true)}
          >
            카드 등록
          </button>
        </div>
      )}
    </>
  );
};

export default NoCard;
