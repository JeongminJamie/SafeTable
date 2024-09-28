import axios from "axios";

// autocomplete을 위한 입력값에 따른 시군구 open api 지역명 요청
export const fetchRegionsByInput = async (inputValue) => {
  const encodedInputValue = encodeURIComponent(inputValue);

  const response = await axios.get(
    `/2ddata/adsigg/data?apiKey=${process.env.REACT_APP_LOCATION_API_KEY}&domain=${process.env.REACT_APP_LOCATION_DOMAIN}&filter=full_nm:like:${encodedInputValue}&output=json&pageIndex=1&pageUnit=10`
  );

  const featuresOfRegions = response.data.featureCollection?.features || [];
  const regionNames = featuresOfRegions.map(
    (feature) => feature.properties.full_nm
  );

  return regionNames;
};

// 검색 핸들러
export const searchHandler = (refetch) => {
  if (inputValue) {
    setLoading(true);
    refetch();
  }
};
