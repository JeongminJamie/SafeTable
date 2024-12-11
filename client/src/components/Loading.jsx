import React from "react";

const Loading = ({ entireHeight, width, height, padding }) => {
  return (
    <div className={`flex justify-center items-center ${entireHeight}`}>
      <img
        src="/assets/loading-animation.gif"
        alt="loading"
        className={`m-auto ${width} ${height} ${padding}`}
      />
    </div>
  );
};

export default Loading;
