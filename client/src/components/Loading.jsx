import React from "react";

const Loading = ({ width, height, padding }) => {
  return (
    <img
      src="/assets/loading-animation.gif"
      alt="loading"
      className={`m-auto ${width} ${height} ${padding}`}
    />
  );
};

export default Loading;
