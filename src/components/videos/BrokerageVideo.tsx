import React from 'react';

const BrokerageVideo = () => {
  return (
    <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
      <iframe
        className="absolute top-0 w-full h-full"
        src="https://www.youtube.com/embed/WiOW6Khu-dk?si=cs7O6UTRfC0pnt0D"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default BrokerageVideo;
