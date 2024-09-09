import React from "react";

const VideoSection = () => {
  return (
    <div>
      <video autoPlay muted loop playsInline>
        <source src="/assets/food-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoSection;
