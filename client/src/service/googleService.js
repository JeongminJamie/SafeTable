import { api } from "../api/api";

const serverURL = process.env.REACT_APP_SERVER_PORT_URL;
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export const getRestaurantPhotoReference = async (restaurantName) => {
  try {
    const response = await api.get(
      `${serverURL}/api/photos/maps/api/place/textsearch/json?query=${restaurantName}&key=${googleApiKey}&language=ko`
    );

    const photoReference =
      response.data?.results?.[0]?.photos?.[0]?.photo_reference || null;

    return photoReference;
  } catch (error) {
    console.error("포토 레퍼런스를 가져오는 도중 에러 발생", error);
  }
};

export const getRestaurantPhoto = async (photoReference) => {
  try {
    const noImageUrl = "https://ducatiperformance.hu/storage/media/noimg.png";

    // photo reference가 null일 때, 사진 없음 이미지 반환
    if (!photoReference) return noImageUrl;

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

export const attachPhotoToRestaurant = async (restaurantData) => {
  const duplicatedRestaurantData = [...restaurantData];

  const restaurantNames = duplicatedRestaurantData.map(
    (restaurant) => restaurant.RELAX_RSTRNT_NM
  );

  // 식당 사진 references 가져오기
  const restaurantPhotoReferences = await Promise.all(
    restaurantNames.map(async (restaurantName) =>
      getRestaurantPhotoReference(restaurantName)
    )
  );

  // 식당 사진 url들 가져오기
  const restaurantPhotos = await Promise.all(
    restaurantPhotoReferences.map((photoReference) =>
      getRestaurantPhoto(photoReference)
    )
  );

  // restaurant data와 photos 합치기
  const restaurantDataWithPhotos = duplicatedRestaurantData.map(
    (restaurantData, index) => {
      return { ...restaurantData, PHOTO_URL: restaurantPhotos[index] };
    }
  );

  return restaurantDataWithPhotos;
};
