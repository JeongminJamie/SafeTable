import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment } from "@mui/material";

import useRestaurantStore from "../../store/useRestaurantStore";
import {
  fetchRegionsByInput,
  searchHandler,
} from "../../service/searchService";

const SearchBox = () => {
  const { setSearchedValue } = useRestaurantStore();

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
  const { data: options = [] } = useQuery({
    queryKey: ["fetchRegions", debouncedInputValue],
    queryFn: () => fetchRegionsByInput(debouncedInputValue),
    enabled: !!debouncedInputValue,
    refetchOnWindowFocus: false,
    staleTime: 120 * 1000,
  });

  // 검색창에 값 입력 시 호출
  const inputChangeHandler = (event, newInputValue) => {
    if (event.type === "change") {
      setInputValue(newInputValue);
      setSelectedValue(null);
      setIsWarned(false);
    }
  };

  // 드랍다운의 옵션 중 하나를 눌렀을 때 호출
  const onChangeHandler = (event, newValue) => {
    if (event.type === "click") {
      if (newValue) {
        setInputValue(newValue);
        setSelectedValue(newValue);

        // 옵션을 클릭했을 때도 검색 수행
        searchHandler(newValue, setIsWarned, setSearchedValue);
      }
    }
  };

  return (
    <>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={inputValue || ""}
        onInputChange={(event, newInputValue) => {
          inputChangeHandler(event, newInputValue);
        }}
        onChange={(event, newValue) => {
          onChangeHandler(event, newValue);
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
        className="flex justify-center items-center w-4/12 h-12 border border-gray-500 rounded-full mx-auto my-14 p-4 mb-0"
      />
      {isWarned && (
        <div className="flex justify-center items-center w-4/12 h-12 text-amber-500 font-medium rounded-full mx-auto">
          지역 옵션 중 하나를 클릭해주세요.
        </div>
      )}
    </>
  );
};

export default SearchBox;
