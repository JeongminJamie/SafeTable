import React, { useState } from "react";

const AddCard = () => {
  const [nameLength, setNameLength] = useState(0);

  const calculateNameLength = (event) => {
    const trimmedInputName = event.target.value?.trim();
    const lengthOfName = trimmedInputName.length || 0;

    setNameLength(lengthOfName);
  };

  return (
    <div className="flex flex-col p-5">
      <img />
      <form className="flex flex-col gap-5">
        <div className="flex flex-col w-full items-start">
          <label className="font-medium text-slate-600">카드 번호</label>
          <input className="bg-slate-200 rounded-xl p-3 w-full"></input>
        </div>
        <div className="flex flex-col w-full items-start">
          <label className="font-medium text-slate-600">만료일</label>
          <input className="bg-slate-200 rounded-xl p-3"></input>
        </div>
        <div className="flex flex-col w-full items-start">
          <label className="font-medium flex justify-between w-full text-slate-600">
            <p>카드 소유자 이름</p>
            <p>{nameLength}/30</p>
          </label>
          <input
            className="bg-slate-200 rounded-xl p-3 w-full"
            onChange={(event) => calculateNameLength(event)}
          ></input>
        </div>
        <div className="flex flex-col w-full items-start">
          <div className="flex items-center jusify-center gap-1">
            <label className="font-medium text-slate-600">보안 코드(CVC)</label>
            <img
              src="/assets/reservation/question.png"
              alt="question"
              className="w-5 h-5 hover:cursor-pointer"
            />
          </div>
          <input
            className="bg-slate-200 rounded-xl p-3"
            type="password"
          ></input>
        </div>
        <div className="flex flex-col w-full items-start">
          <label className="font-medium text-slate-600">
            카드 비밀번호 2자리
          </label>
          <input
            className="bg-slate-200 rounded-xl p-3"
            type="password"
          ></input>
        </div>
        <button>등록</button>
      </form>
    </div>
  );
};

export default AddCard;
