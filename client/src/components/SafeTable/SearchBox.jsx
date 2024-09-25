import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment } from "@mui/material";
import axios from "axios";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  // input 결과값에 따른 행정구역 open api로 패치 요청
  const fetchRegionsByinput = async () => {
    if (inputValue) {
      try {
        const response = await axios.get(`YOUR_API_URL?query=${inputValue}`);
        console.log("행정구역 패치 결과 확인", response);
        setOptions(response.data);
      } catch (error) {
        console.error(
          "검색어에 따른 행정구역 명을 패치하는 도중 오류 발생",
          error
        );
      }
    }
  };

  // 검색어가 변할 때마다, 타이핑을 끝낸 후(300ms 예상)에 지역명을 옵션으로 보여주기
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchRegionsByinput();
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      value={inputValue}
      options={options}
      onInputChange={(event, inputWord) => {
        setInputValue(inputWord);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="지역 검색"
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
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
      renderOption={(props, option) => <li {...props}>{option}</li>}
      className="flex justify-center items-center w-4/12 h-12 border border-gray-500 rounded-full mx-auto my-14 p-4"
    />
  );
};

export default SearchBox;

//     return () => clearTimeout(debounceTimeout);
//   }, [inputValue]);
