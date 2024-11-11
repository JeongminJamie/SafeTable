import { api } from "../api/api";

const serverURL = process.env.REACT_APP_SERVER_PORT_URL;
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export const getRestaurantPhotoReference = async (restaurantName) => {
  try {
    const response = await api.get(
      `${serverURL}/api/photos/textsearch/json?query=${restaurantName}&key=${googleApiKey}&language=ko`
    );

    const photoReference = response.data;

    console.log("포토 레퍼런스 확인", photoReference);
    return photoReference;
  } catch (error) {
    console.error("포토 레퍼런스를 가져오는 도중 에러 발생", error);
  }
};

export const getRestaurantPhoto = async (photoReference) => {};
