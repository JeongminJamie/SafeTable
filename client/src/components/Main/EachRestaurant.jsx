import React, { useEffect, useState, useCallback } from "react";
import { getPhotoWithRestaurantName } from "../../service/googleService";

const EachRestaurant = ({ name, address, category, refetch }) => {
  const [photoSource, setPhotoSource] = useState("");

  const getRestaurantPhoto = useCallback(async (name) => {
    const photoURL = await getPhotoWithRestaurantName(name);

    setPhotoSource(photoURL);
  }, []);

  useEffect(() => {
    getRestaurantPhoto(name);
  }, []);

  // 무조군 사진이 있는 식당들로만 패치
  useEffect(() => {
    const noImageUrl = "https://ducatiperformance.hu/storage/media/noimg.png";

    if (photoSource === noImageUrl) {
      refetch();
    }
  }, [photoSource]);

  return (
    <div className="w-full h-[26rem] p-1 transition-transform transform rounded-lg hover:rounded-2xl hover:translate-y-[-4px] hover:shadow-lg hover:shadow-gray-500/50 cursor-pointer">
      {photoSource ? (
        <img
          src={photoSource}
          className="rounded-2xl object-cover w-full h-4/6"
        />
      ) : (
        <div className="w-full h-full bg-slate-200"></div>
      )}
      <div className="flex flex-col justify-center space-around gap-3 mt-2 p-2">
        <div className="font-medium text-xl">{name}</div>
        <div className="w-12 bg-yellow-400 px-1 rounded">
          <div className="text-center text-white text-sm font-medium">
            {category}
          </div>
        </div>
        <div className="mb-2">{address}</div>
      </div>
    </div>
  );
};

export default EachRestaurant;

// className="w-full bg-white text-amber-500 border border-amber-500 py-2 rounded-lg hover:bg-amber-500 hover:text-white transition-colors"


