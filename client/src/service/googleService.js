import { api } from "../api/api";

const serverURL = process.env.REACT_APP_SERVER_PORT_URL;
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export const getRestaurantPhotoReference = async (restaurantName) => {
  try {
    const response = await api.get(
      `${serverURL}/api/photos/maps/api/place/textsearch/json?query=${restaurantName}&key=${googleApiKey}&language=ko`
    );

    if (response.data.results.length < 0) {
      return null;
    } else if (response.data.results[0].photos.length < 0) {
      return null;
    } else {
      const photoReference =
        response.data.results[0].photos[0]?.photo_reference;
      return photoReference;
    }
  } catch (error) {
    console.error("포토 레퍼런스를 가져오는 도중 에러 발생", error);
  }
};

export const getRestaurantPhoto = async (photoReference) => {
  try {
    const response = await api.get(
      `${serverURL}/api/photos/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleApiKey}`,
      {
        responseType: "blob",
      }
    );

    const photoUrl = URL.createObjectURL(response.data);

    return photoUrl;
  } catch (error) {
    console.error("photo url 찾는 중 에러 발생", error);
  }
};
