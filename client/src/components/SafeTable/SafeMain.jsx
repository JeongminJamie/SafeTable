import React from "react";
import { TableCard } from "./tableCard";
import { useNavigate } from "react-router-dom";
import EmptyRestaurant from "./EmptyRestaurant";

const SafeMain = () => {
  const navigate = useNavigate();

  return (
    <div className="px-10">
      {/* 식당 카드 - 최대 4열 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-5 p-5  gap-y-10">
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
      </div>
      {/* To-do: 입력값에 따른 안심식당 정보가 없을 때 아래 컴포넌트 보여주기!! */}
      {/* <EmptyRestaurant /> */}
    </div>
  );
};

export default SafeMain;
