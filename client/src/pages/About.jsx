import React, { useEffect } from "react";
import AboutImage from "../components/About/AboutImage";
import Introduction from "../components/About/Introduction";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantPhotoReference } from "../service/googleService";

const About = () => {
  const restaurantName = "대방골";
  const { data, isLoading } = useQuery({
    queryKey: ["getPhotoReference"],
    queryFn: () => getRestaurantPhotoReference(restaurantName),
  });

  useEffect(() => {
    if (!isLoading && data) {
      console.log("포토 레퍼런스 패칭 데이터 확인", data);
    }
  }, []);
  return (
    <div>
      <AboutImage />
      <Introduction />
    </div>
  );
};

export default About;
