import { api } from "../api/api";

const restaurantAPIKey = process.env.REACT_APP_RESTAURANT_API_KEY;

export const getFourRestaurantsInfo = async () => {
  // 랜덤으로 4개의 식당 가져오기 
  const randomStartIndex = Math.floor(Math.random() * 100);

  const response = await api.get(
    `/api/restaurants/openapi/${restaurantAPIKey}/json/Grid_20200713000000000605_1/${randomStartIndex}/${
      randomStartIndex + 3
    }?RELAX_SI_NM=서울특별시`
  );

  const restaurantData = response.data.Grid_20200713000000000605_1.row;

  return restaurantData;
};
