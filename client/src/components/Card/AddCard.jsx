import React, { useState, useRef, useEffect } from "react";
import { cardCompanies, initialCardInfo } from "../../constants/card";
import useCardRegister from "../../hooks/useCardRegister";
import CVCGuide from "./CVCGuide";
import IncorrectCardModal from "./IncorrectCardModal";

const AddCard = () => {
  const [nameLength, setNameLength] = useState(0);
  const [isCVCGuideClicked, setIsCVCGuideClicked] = useState(false);
  const [isCardIncorrect, setIsCardIncorrect] = useState(false);

  const nameInputRef = useRef(null);
  const cvcGuideRef = useRef(null);

  const {
    cardInfo,
    companyChangeHanlder,
    cardNumberChangeHandler,
    expireDateChangeHandler,
    nameChangeHandler,
    cvcChangeHandler,
    passwordChangeHandler,
  } = useCardRegister(initialCardInfo);

  // 카드 소유자 이름 길이 계산 함수
  const calculateNameLength = (event) => {
    const name = event.target.value;
    const lengthOfName = name.trim().length || 0;

    setNameLength(lengthOfName);
  };

  // 등록 버튼 처리 함수
  const confirmButtonHandler = (e) => {
    e.preventDefault();

    if (nameLength > 30) {
      nameInputRef.current.focus();
    }

    // To-do: 신용 카드 유효성 검사 로직 필요!!
    // To-do: 유효하지 않으면 모달 띄우기!!
    setIsCardIncorrect(true);
    // To-do: 유효한 카드이면 DB에 저장 필요!!
  };

  // cvc guide가 열렸을 때, 다른 곳을 클릭했을 시 안 보이게 하기
  const handleClickOutsideCVC = (event) => {
    if (cvcGuideRef.current && !cvcGuideRef.current.contains(event.target)) {
      setIsCVCGuideClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideCVC);
    setIsCardIncorrect(false);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCVC);
    };
  }, [cvcGuideRef]);

  return (
    <>
      {isCardIncorrect && (
        <IncorrectCardModal
          isIncorrect={isCardIncorrect}
          setIsIncorrect={setIsCardIncorrect}
        />
      )}
      <div className="flex flex-col p-5">
        <h1 className="font-semibold text-3xl">카드 추가</h1>
        <form className="flex flex-col gap-5 mt-10">
          <div className="flex w-full items-center gap-7">
            <label className="font-semibold text-slate-600">카드사</label>
            <select
              className="w-40 border border-gray-300 rounded-md p-1 hover:cursor-pointer"
              onChange={companyChangeHanlder}
            >
              {cardCompanies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-full items-start">
            <label className="font-semibold text-slate-600">카드 번호</label>
            <input
              className="bg-slate-200 rounded-xl p-3 w-full"
              placeholder="0000 0000 0000 0000"
              onChange={(event) => cardNumberChangeHandler(event)}
              value={cardInfo.cardNumber}
            />
          </div>
          <div className="flex flex-col w-full items-start">
            <label className="font-semibold text-slate-600">만료일</label>
            <input
              className="bg-slate-200 rounded-xl p-3 w-3/12"
              placeholder="MM/YY"
              value={cardInfo.expireDate}
              onChange={(event) => expireDateChangeHandler(event)}
            />
          </div>
          <div className="flex flex-col w-full items-start">
            <label className="font-semibold flex justify-between w-full text-slate-600">
              <p>카드 소유자 이름</p>
              <div className="flex">
                {/* 입력된 이름이 30자 이상이면 빨간색의 글씨체 보여주기 */}
                <p
                  className={`${
                    nameLength > 30 ? "font-semibold text-red-400" : ""
                  }`}
                >
                  {nameLength}
                </p>
                <p>/30</p>
              </div>
            </label>
            {/* 입력된 이름이 30자 이상이면 빨간색의 보더 보여주기 */}
            <input
              className={`bg-slate-200 rounded-xl p-3 w-full ${
                nameLength > 30
                  ? "focus:outline-none border-2 border-red-400"
                  : ""
              }`}
              placeholder="카드에 표시된 이름과 일치되도록 입력해주세요."
              value={cardInfo.name}
              ref={nameInputRef}
              onChange={nameChangeHandler}
              onInput={calculateNameLength}
            />
            {/* 입력된 이름이 30자 이상이면 메세지 보여주기 */}
            {nameLength > 30 && (
              <div className="font-medium text-red-700">
                이름은 최대 30자까지 입력 가능합니다.
              </div>
            )}
          </div>
          <div className="flex flex-col w-full items-start relative">
            <div className="flex items-center justify-center gap-1">
              <label className="font-semibold text-slate-600">
                보안 코드(CVC)
              </label>
              <img
                src="/assets/reservation/question.png"
                alt="question"
                className="w-5 h-5 hover:cursor-pointer"
                onClick={() => setIsCVCGuideClicked((prev) => !prev)}
              />
              {/* cvc guide가 눌렸을 때 보여주기 */}
              {isCVCGuideClicked && (
                <div ref={cvcGuideRef}>
                  <CVCGuide />
                </div>
              )}
            </div>
            <input
              className="bg-slate-200 rounded-xl p-3"
              type="password"
              value={cardInfo.cvcNumber}
              onChange={(event) => cvcChangeHandler(event)}
            />
          </div>
          <div className="flex flex-col w-full items-start">
            <label className="font-semibold text-slate-600">
              카드 비밀번호 2자리
            </label>
            <input
              className="bg-slate-200 rounded-xl p-3 w-3/12"
              type="password"
              value={cardInfo.cardPassword}
              onChange={(event) => passwordChangeHandler(event)}
            />
          </div>
          <button
            className="rounded font-medium w-5/12 h-12 bg-amber-500 text-white m-auto mt-2"
            onClick={confirmButtonHandler}
          >
            등록
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCard;
