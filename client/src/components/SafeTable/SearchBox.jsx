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
    inputValue,
    setInputValue,
    setFetchedRestaurants,
    setSearchLoading,
    setSearchError,
  } = useSearchStore();
  const [debouncedInputValue, setDebouncedInputValue] = useState("");

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
  });

  // 검색된 지역 식당 리액트 쿼리 패치
  // const { refetch } = useQuery({
  //   queryKey: ["fetchLocationRestaurants", inputValue],
  //   queryFn: fetchRestaurantByInput(inputValue),
  //   enabled: false,
  //   onSettled: (data, error) => {
  //     setSearchLoading(false);
  //     if (error) setSearchError(true);
  //   },
  //   onSuccess: (data) => {
  //     setFetchedRestaurants(data);
  //   },
  // });

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
      // onKeyDown={(event) => {
      //   if (event.key === "Enter") {
      //     searchHandler(inputValue, refetch);
      //   }
      // }}
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
                    // onClick={() => searchHandler(inputValue, refetch)}
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
