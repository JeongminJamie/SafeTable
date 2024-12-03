import { api } from "../api/api";

const serverURL = process.env.REACT_APP_SERVER_PORT_URL;
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const noImageUrl = "https://ducatiperformance.hu/storage/media/noimg.png";

export const getRestaurantPhotoReference = async (restaurantName) => {
  if (!restaurantName) console.log("전달받은 식당 이름이 정확하지 않습니다.");

  try {
    const response = await api.get(
      `${serverURL}/api/photos/maps/api/place/textsearch/json?query=${restaurantName}&key=${googleApiKey}&language=ko`
    );

    const photoReference =
      response.data?.results?.[0]?.photos?.[0]?.photo_reference || null;

    return photoReference;
  } catch (error) {
    console.error("식당 이름으로 레퍼런스 가져오는 중 에러 발생", error);
  }
};

export const getRestaurantPhoto = async (photoReference) => {
  // photo reference가 null일 때, 사진 없음 이미지 반환
  if (!photoReference) return noImageUrl;

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
    console.error("레퍼런스로 사진 url 가져오는 중 오류 발생", error);
  }
};

export const getPhotoWithRestaurantName = async (restaurantName) => {
  if (!restaurantName)
    console.log("식당 이름이 존재하지 않아 photo url를 찾을 수 없습니다.");

  try {
    const photoReference = await getRestaurantPhotoReference(restaurantName);
    const photoURL = await getRestaurantPhoto(photoReference);

    return photoURL;
  } catch (error) {
    console.error("photo url를 찾는 중 오류 발생", error);
  }
};
