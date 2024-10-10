import React, { useEffect } from "react";
import SafeMain from "../components/SafeTable/SafeMain";
import SearchBox from "../components/SafeTable/SearchBox";
import axios from "axios";

const SafeTable = () => {
  const fetchRestaurants = async () => {
    const response = await axios.get(
      "/openapi/673ff19210c768aa68dbffd42ddb72733531d316efad32d2b930c1c286975e58/json/Grid_20200713000000000605_1/1/50"
    );
    console.log(response.data.Grid_20200713000000000605_1.row);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);
  return (
    <>
      <SearchBox />
      <SafeMain />
    </>
  );
};

export default SafeTable;
