import React from "react";
import Skeleton from "@mui/material/Skeleton";

const RestaurantSkeleton = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <Skeleton variant="rectangular" width="100%" height={150} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </div>
  );
};

export default RestaurantSkeleton;
