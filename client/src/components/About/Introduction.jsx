import React from "react";

const Introduction = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-10 py-20">
        <section className="font-semibold text-4xl">
          <h1>안녕하세요</h1>
          <h1>안심테이블입니다</h1>
        </section>
        <section className="text-lg">
          <p>
            <span className="text-xl font-semibold text-amber-600">
              안심테이블
            </span>
            은
          </p>
          <p>
            농림축산부에서 지정한{" "}
            <span className="text-xl font-semibold text-amber-600">
              안심식당 리스트
            </span>
            를 제공하며,{" "}
          </p>
          <p>
            원하는 시간에 손쉽게{" "}
            <span className="text-xl font-semibold text-amber-600">예약</span>할
            수 있는 플랫폼입니다.
          </p>
        </section>
        <section className="text-lg flex flex-col gap-5">
          <div>
            <p className="font-semibold text-xl text-amber-600">
              안심식당이란?
            </p>
            <p>
              안심식당은 아래의{" "}
              <span className="font-semibold">3가지 방역수칙</span>을 철저히
              준수하는 곳입니다.
            </p>
          </div>
          <p>
            <span className="font-semibold">덜어먹기</span>가 가능한 도구 비치
            및 제공
          </p>
          <p>
            <span className="font-semibold">위생적인</span> 수저 관리
          </p>
          <p>
            직원들의 <span className="font-semibold">마스크</span> 착용
          </p>
        </section>
        <section className="text-lg">
          <p className="font-semibold">
            청결과 안전을 보장하는 식당에서 안심하고 식사하세요!
          </p>
          <p>
            요즘처럼 유행병에 더욱 주의해야 할 시기에, 안심테이블은 여러분이
            더욱 안전하게 외식할 수 있도록 도와드립니다.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Introduction;
