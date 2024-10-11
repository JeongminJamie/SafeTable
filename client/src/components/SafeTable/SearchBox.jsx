import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment } from "@mui/material";

import useSearchStore from "../../store/useRestaurantStore";
import {
  fetchRegionsByInput,
  fetchRestaurantByInput,
  searchHandler,
} from "../../utils/searchService";

const SearchBox = () => {
  const {
    searchedValue,
    setSearchedValue,
    setFetchedRestaurants,
    setSearchLoading,
    setSearchError,
  } = useSearchStore();

  const [inputValue, setInputValue] = useState("");
  const [debouncedInputValue, setDebouncedInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [isWarned, setIsWarned] = useState(false);

  // 검색어가 변할 때마다, 타이핑을 끝낸 후(300ms 예상) debouncedInputValue에 저장해줌
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 200);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [inputValue]);

  // 검색창의 지역명 autocomplete 리액트 쿼리 패치
  const {
    data: options = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fetchRegions", debouncedInputValue],
    queryFn: () => fetchRegionsByInput(debouncedInputValue),
    enabled: !!debouncedInputValue,
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  // 검색된 지역 안심식당 리액트 쿼리 패치
  const { data: locationRestaurants = null } = useQuery({
    queryKey: ["fetchLocationRestaurants", searchedValue],
    queryFn: () => fetchRestaurantByInput(searchedValue),
    enabled: !!searchedValue,
    onSettled: (data, error) => {
      setSearchLoading(false);
      if (error) setSearchError(true);
    },
    staleTime: 120 * 1000,
    refetchOnWindowFocus: false,
  });

  // 검색된 입력값에 따른 지역 안심식당 패치 후 레스토랑 데이터 상태 업데이트
  useEffect(() => {
    if (locationRestaurants) {
      setFetchedRestaurants(locationRestaurants);
    }
  }, [locationRestaurants]);

  const inputChangeHandler = (newInputValue) => {
    setInputValue(newInputValue);
    setSelectedValue(null);
  };

  const onChangeHandler = (newValue) => {
    setInputValue(newValue || "");
    setSelectedValue(newValue || null);

    //선택했을 때도 검색이 되게 하는 부분
    searchHandler(newValue, setIsWarned, setSearchedValue);
  };

  return (
    <>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          inputChangeHandler(newInputValue);
        }}
        onChange={(_, newValue) => {
          onChangeHandler(newValue);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            searchHandler(selectedValue, setIsWarned, setSearchedValue);
          }
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
                      onClick={() =>
                        searchHandler(
                          selectedValue,
                          setIsWarned,
                          setSearchedValue
                        )
                      }
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
        className="flex justify-center items-center w-4/12 h-12 border border-gray-500 rounded-full mx-auto my-14 p-4"
      />
      {isWarned && (
        <div className="text-red-500">아래 옵션 중 하나를 클릭해주세요.</div>
      )}
    </>
  );
};

export default SearchBox;
