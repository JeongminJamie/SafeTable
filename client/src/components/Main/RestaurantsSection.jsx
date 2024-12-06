import React, { useState, useEffect } from "react";
import EachRestaurant from "./EachRestaurant";
import { useQuery } from "@tanstack/react-query";
import { getFourRestaurantsInfo } from "../../service/mainPageService";

const RestaurantsSection = () => {
  const [restaurantsInfo, setRestaurantsInfo] = useState([]);

  const { data: restaurants } = useQuery({
    queryKey: ["getFoutRestaurantInfo"],
    queryFn: getFourRestaurantsInfo,
    staleTime: 60 * 1000,
    suspense: true,
  });

  useEffect(() => {
    if (restaurants) {
      setRestaurantsInfo(restaurants);
    }
  }, [restaurants]);

  return (
    <div className="w-full h-[39rem] overflow-x-hidden flex flex-col items-center mb-4">
      <div className="font-bold text-4xl text-center mt-10 mb-2">추천 식당</div>
      <div className="w-11/12 flex flex-row w-full justify-between items-center gap-3 p-10">
        {restaurantsInfo.map((eachInfo) => (
          <EachRestaurant
            key={eachInfo.RELAX_SEQ}
            name={eachInfo.RELAX_RSTRNT_NM}
            address={eachInfo.RELAX_ADD1 + eachInfo.RELAX_ADD2}
            category={eachInfo.RELAX_GUBUN_DETAIL}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsSection;
