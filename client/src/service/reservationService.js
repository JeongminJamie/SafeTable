import { getAxiosHeaderConfig } from "../config";
import { api } from "../api/api";

const restaurantAPIKey = process.env.REACT_APP_RESTAURANT_API_KEY;

export const getRestaurantBySEQ = async (seq) => {
  const response = await api.get(
    `/api/restaurants/openapi/${restaurantAPIKey}/json/Grid_20200713000000000605_1/1/1?RELAX_SEQ=${seq}`
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
    category: restaurant.category,
    address: restaurant.address,
    telephone: restaurant.telephone,
    party_size: reservationStore.partySize,
    date: reservationStore.date,
    time: reservationStore.timeSlot,
  };

  const response = await api.post(
    `/api/reservation`,
    reservationInfoToSend,
    headersConfig
  );

  return response.data;
};
