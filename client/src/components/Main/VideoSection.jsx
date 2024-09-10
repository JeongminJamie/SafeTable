import React from "react";

const VideoSection = () => {
  return (
    <div className="w-full overflow-hidden">
      <video autoPlay muted loop playsInline>
        <source src="/assets/cooking-video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoSection;
