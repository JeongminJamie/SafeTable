import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SearchBox = () => {
  // Top 5 Nigerian songs on Apple Music
  const top5Songs = [
    { label: "Organize" },
    { label: "Joha" },
    { label: "Terminator" },
    { label: "Dull" },
    { label: "Nzaza" },
  ];

  // return (
  //   <div className="flex justify-center items-center w-4/12 h-12 border border-gray-500 rounded-full mx-auto my-14 p-4">
  //     <input
  //       className="w-full focus:outline-none
  //       placeholder:font-medium placeholder:text-center"
  //       placeholder="지역 검색"
  //     ></input>
  //     <img
  //       src="/assets/safeTable/search.png"
  //       alt="search"
  //       className="w-7 h-7 hover:cursor-pointer"
  //     />
  //   </div>
  // );
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top5Songs}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Songs" />}
    />
  );
};

export default SearchBox;

// import React, { useState, useEffect } from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';

// const LocationSearch = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       if (inputValue) {
//         try {
//           const response = await axios.get(`YOUR_API_URL?query=${inputValue}`);
//           // response.data에서 지역명 추출
//           const locationNames = response.data.map(location => location.name); // 데이터 구조에 맞게 조정
//           setOptions(locationNames);
//         } catch (error) {
//           console.error('Error fetching locations:', error);
//         }
//       } else {
//         setOptions([]);
//       }
//     };

//     const debounceTimeout = setTimeout(() => {
//       fetchLocations();
//     }, 300); // 300ms 지연 후 API 호출

//     return () => clearTimeout(debounceTimeout);
//   }, [inputValue]);

//   return (
//     <Autocomplete
//       freeSolo
//       options={options}
//       onInputChange={(event, newInputValue) => {
//         setInputValue(newInputValue);
//       }}
//       renderInput={(params) => (
//         <TextField {...params} label="Search for a location" variant="outlined" />
//       )}
//       renderOption={(props, option) => (
//         <li {...props}>{option}</li>
//       )}
//     />
//   );
// };

// export default LocationSearch;
