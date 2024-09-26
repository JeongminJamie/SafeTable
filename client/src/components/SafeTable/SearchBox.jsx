import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment } from "@mui/material";
import axios from "axios";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

  // To-do: 엔터키를 누르거나, 검색 아이콘을 눌렀을 때 입력값에 맞는 지역 안심식당 정보 패치하기!!!

  // 입력값에 따른 시군구 open api로 데이터 패치 요청
  const fetchRegionsByInput = async (inputValue) => {
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

  // 검색어가 변할 때마다, 타이핑을 끝낸 후(300ms 예상) debouncedInputValue에 저장해줌
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 200);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [inputValue]);

  // useQuery로 데이터를 가져옴
  const {
    data: options = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["fetchRegions", debouncedInputValue],
    queryFn: () => fetchRegionsByInput(debouncedInputValue),
    enabled: !!debouncedInputValue,
    refetchOnWindowFocus: false,
  });

  return (
    <Autocomplete
      freeSolo
      options={options}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        setInputValue(newValue || "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="지역 검색"
          variant="standard"
          slotProps={{
            input: {
              ...params.InputProps,
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ position: "absolute", marginLeft: "95%" }}
                >
                  <img
                    src="/assets/safeTable/search.png"
                    alt="search"
                    className="w-7 h-7 hover:cursor-pointer"
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
      className="flex justify-center items-center w-4/12 h-12 border border-gray-500 rounded-full mx-auto my-14 p-4"
    />
  );
};

export default SearchBox;
