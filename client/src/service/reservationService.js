import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_PORT_URL;
const restaurantAPIKey = process.env.REACT_APP_RESTAURANT_API_KEY;

export const getRestaurantBySEQ = async (seq) => {
  const response = await axios.get(
    `${serverURL}/api/restaurants/openapi/${restaurantAPIKey}/json/Grid_20200713000000000605_1/1/1?RELAX_SEQ=${seq}`
  );

  const restaurantData = response.data.Grid_20200713000000000605_1?.row[0];

  console.log(restaurantData);
  return restaurantData;
};
