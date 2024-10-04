import React, { useState } from "react";
import { cardCompanies, initialCardInfo } from "../../constants/card";
import useCardRegister from "../../hooks/useCardRegister";

const AddCard = () => {
  const [nameLength, setNameLength] = useState(0);
  const {
    cardInfo,
    companyChangeHanlder,
    cardNumberChangeHanlder,
    expireDateChangeHandler,
  } = useCardRegister(initialCardInfo);

  // 카드 소유자 이름 input 길이 계산 함수
  const calculateNameLength = (event) => {
    const trimmedInputName = event.target.value?.trim();
    const lengthOfName = trimmedInputName.length || 0;

    setNameLength(lengthOfName);
  };

  return (
    <div className="flex flex-col p-5">
      <img />
      <h1 className="font-semibold text-2xl">카드 추가</h1>
      <form className="flex flex-col gap-5 mt-10">
        <div className="flex w-full items-center gap-7">
          <label className="font-semibold text-slate-600">카드사</label>
          <select
            className="w-40 border border-gray-300 rounded-md p-1 hover:cursor-pointer"
            onChange={companyChangeHanlder}
          >
            {cardCompanies.map((company) => (
              <option value={company}>{company}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full items-start">
          <label className="font-semibold text-slate-600">카드 번호</label>
          <input
            className="bg-slate-200 rounded-xl p-3 w-full"
            placeholder="0000 0000 0000 0000"
            onChange={(event) => cardNumberChangeHanlder(event)}
            value={cardInfo.cardNumber}
          ></input>
        </div>
        <div className="flex flex-col w-full items-start">
          <label className="font-semibold text-slate-600">만료일</label>
          <input
            className="bg-slate-200 rounded-xl p-3"
            placeholder="MM/YY"
            value={cardInfo.expireDate}
            onChange={(event) => expireDateChangeHandler(event)}
          ></input>
        </div>
        <div className="flex flex-col w-full items-start">
          <label className="font-semibold flex justify-between w-full text-slate-600">
            <p>카드 소유자 이름</p>
            <p>{nameLength}/30</p>
          </label>
          <input
            className="bg-slate-200 rounded-xl p-3 w-full"
            placeholder="카드에 표시된 이름과 일치되도록 입력해주세요."
            value={cardInfo.name}
            onChange={(event) => calculateNameLength(event)}
          ></input>
        </div>
        <div className="flex flex-col w-full items-start">
          <div className="flex items-center jusify-center gap-1">
            <label className="font-semibold text-slate-600">
              보안 코드(CVC)
            </label>
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
          <label className="font-semibold text-slate-600">
            카드 비밀번호 2자리
          </label>
          <input
            className="bg-slate-200 rounded-xl p-3"
            type="password"
          ></input>
        </div>
        <button className="rounded font-medium w-5/12 h-12 bg-amber-500 text-white m-auto mt-2">
          등록
        </button>
      </form>
    </div>
  );
};

export default AddCard;
