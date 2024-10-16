import React from "react";
import Skeleton from "@mui/material/Skeleton";

const RestaurantSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <Skeleton variant="rectangular" width="100%" height={150} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
      <div className="w-full flex flex-row gap-3">
        <Skeleton variant="rectangular" width="50%" height={25} />
        <Skeleton variant="rectangular" width="50%" height={25} />
      </div>
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="rectangular" width="100%" height={30} />
    </div>
  );
};

export default RestaurantSkeleton;
