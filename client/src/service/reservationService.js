import axios from "axios";
import { getAxiosHeaderConfig } from "../config";

const serverURL = process.env.REACT_APP_SERVER_PORT_URL;
const restaurantAPIKey = process.env.REACT_APP_RESTAURANT_API_KEY;

export const getRestaurantBySEQ = async (seq) => {
  const response = await axios.get(
    `${serverURL}/api/restaurants/openapi/${restaurantAPIKey}/json/Grid_20200713000000000605_1/1/1?RELAX_SEQ=${seq}`
  );

  const restaurantData = response.data.Grid_20200713000000000605_1?.row[0];

  return restaurantData;
};

export const saveReservation = async (reservationStore) => {
  const headersConfig = getAxiosHeaderConfig();
  const restaurant = reservationStore.restaurant;

  const reservationInfoToSend = {
    seq: restaurant.seq,
    name: restaurant.name,
    address: restaurant.address,
    telephone: restaurant.telephone,
    party_size: reservationStore.partySize,
    date: reservationStore.date,
    time: reservationStore.timeSlot,
  };

  const response = await axios.post(
    `${serverURL}/api/reservation`,
    reservationInfoToSend,
    headersConfig
  );

  return response.data;
};
