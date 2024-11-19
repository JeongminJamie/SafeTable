import { api } from "../api/api";

const serverURL = process.env.REACT_APP_SERVER_PORT_URL;
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const noImageUrl = "https://ducatiperformance.hu/storage/media/noimg.png";

export const getRestaurantPhotoReference = async (restaurantName) => {
  const response = await api.get(
    `${serverURL}/api/photos/maps/api/place/textsearch/json?query=${restaurantName}&key=${googleApiKey}&language=ko`
  );

  const photoReference =
    response.data?.results?.[0]?.photos?.[0]?.photo_reference || null;

  return photoReference;
};

export const getRestaurantPhoto = async (photoReference) => {
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
};

// 식당 사진이나 레퍼런스 응답이 400/500일 때의 경우, noImageUrl 날리기(한번씩 식당 하나가 응답 500을 보내요)
export const handleSettledResult = (result, defaultValue) => {
  return result?.status === "fulfilled" ? result.value : defaultValue;
};

export const attachPhotoToRestaurant = async (restaurantData) => {
  const duplicatedRestaurantData = [...restaurantData];

  const restaurantNames = duplicatedRestaurantData.map(
    (restaurant) => restaurant.RELAX_RSTRNT_NM
  );

  // 식당 사진 references 가져오기
  const restaurantPhotoReferences = await Promise.allSettled(
    restaurantNames.map(async (restaurantName) =>
      getRestaurantPhotoReference(restaurantName)
    )
  );
  const resolvedPhotoReferences = restaurantPhotoReferences.map((result) =>
    handleSettledResult(result, null)
  );

  // 식당 사진 url들 가져오기
  const restaurantPhotos = await Promise.allSettled(
    resolvedPhotoReferences.map((photoReference) =>
      getRestaurantPhoto(photoReference)
    )
  );

  const resolvedPhotoUrls = restaurantPhotos.map((result) =>
    handleSettledResult(result, noImageUrl)
  );

  // restaurant data와 photos 합치기
  const restaurantDataWithPhotos = duplicatedRestaurantData.map(
    (restaurantData, index) => {
      return { ...restaurantData, PHOTO_URL: resolvedPhotoUrls[index] };
    }
  );

  return restaurantDataWithPhotos;
};
