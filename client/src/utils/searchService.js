import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_PORT_URL;

// autocomplete을 위한 입력값에 따른 시군구 open api 지역명 요청
export const fetchRegionsByInput = async (inputValue) => {
  try {
    const response = await axios.get(
      `${serverURL}/api/locations/2ddata/adsigg/data?apiKey=${
        process.env.REACT_APP_LOCATION_API_KEY
      }&domain=${
        process.env.REACT_APP_LOCATION_DOMAIN
      }&filter=full_nm:like:${encodeURIComponent(
        inputValue
      )}&output=json&pageIndex=1&pageUnit=10`
    );

    const featuresOfRegions = response.data.featureCollection?.features || [];
    const regionNames = featuresOfRegions.map(
      (feature) => feature.properties.full_nm
    );

    return regionNames;
  } catch (error) {
    console.error("입력값에 따른 지역명 패치 중 에러 발생", error);
  }
};

// 검색 핸들러
export const searchHandler = (inputValue, refetch) => {
  if (inputValue?.trim().length > 1) {
    refetch();
  }
};

// 검색된 입력값에 따른 식당 정보 조회 요청
export const fetchRestaurantByInput = async (inputValue) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_RESTAURANT_BASE_URL}/${
        process.env.REACT_APP_RESTAURANT_API_URL
      }/1/5?API_KEY=${
        process.env.REACT_APP_RESTAURANT_API_KEY
      }&RELAX_SI_NM=${encodeURIComponent(inputValue)}`
    );

    console.log("지역명 식당 조회", response);
    return response.data;
  } catch (error) {
    console.error("지역명에 따른 식당 패치 중 에러 발생", error);
  }
};
