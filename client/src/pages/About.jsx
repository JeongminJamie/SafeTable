import React, { useEffect, useState } from "react";
import AboutImage from "../components/About/AboutImage";
import Introduction from "../components/About/Introduction";
import { useQuery } from "@tanstack/react-query";
import {
  getRestaurantPhoto,
  getRestaurantPhotoReference,
} from "../service/googleService";

const About = () => {
  const restaurantName = "제주항구";
  const noImageUrl = "https://ducatiperformance.hu/storage/media/noimg.png";
  const [imageUrl, setImageUrl] = useState("");

  // 사진 레퍼런스 받아오는 요청
  const { data, isLoading } = useQuery({
    queryKey: ["getPhotoReference"],
    queryFn: () => getRestaurantPhotoReference(restaurantName),
  });

  // 레퍼런스가 있을 때, 사진 불러오는 요청
  const { data: photoUrl, isLoading: isPhotoLoading } = useQuery({
    queryKey: ["getRestaurantPhotoUrl"],
    queryFn: () => getRestaurantPhoto(data),
    enabled: !!data,
  });

  useEffect(() => {
    if (!isPhotoLoading) {
      if (photoUrl) {
        setImageUrl(photoUrl);
      } else {
        setImageUrl(noImageUrl);
      }
      return () => {
        URL.revokeObjectURL(photoUrl);
      };
    }
  }, [isPhotoLoading, photoUrl]);

  return (
    <div>
      <AboutImage />
      <Introduction />
      <div>
        {isLoading || isPhotoLoading ? (
          <p>이미지를 로딩 중...</p>
        ) : (
          imageUrl && <img src={imageUrl} alt="restaurant-image" />
        )}
      </div>
    </div>
  );
};

export default About;
