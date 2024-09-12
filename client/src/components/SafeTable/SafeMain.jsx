import React from "react";
import { TableCard } from "./tableCard";
import { useNavigate } from "react-router-dom";

const SafeMain = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10">
      {/* 식당 카드 - 최대 5열 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 p-10">
        <div onClick={() => navigate("/safetabledetail")}>
          <TableCard />
        </div>

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
    </div>
  );
};

export default SafeMain;
