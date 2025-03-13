import React from 'react';

const StrategyVideo = () => {
  return (
    <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/zLVC8lr6GFs?si=udcGxO2L0rnscAAX"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default StrategyVideo;
