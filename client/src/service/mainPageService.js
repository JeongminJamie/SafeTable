import { api } from "../api/api";

const restaurantAPIKey = process.env.REACT_APP_RESTAURANT_API_KEY;

export const getFourRestaurantsInfo = async () => {
  const response = await api.get(
    `/api/restaurants/openapi/${restaurantAPIKey}/json/Grid_20200713000000000605_1/0/4?RELAX_SI_NM=서울특별시`
  );

  const restaurantData = response.data.Grid_20200713000000000605_1.row;

  return restaurantData;
};
