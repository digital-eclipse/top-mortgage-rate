import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Dynamically create an array of image paths (assuming you have 25 lender images)
const lenderImages = Array.from({ length: 38 }, (_, index) => ({
  src: `/images/landing/lenders/lender-${index + 1}.png`,
  alt: `Lender ${index + 1}`,
}));

export default function LendersCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true, // Enable infinite looping
    },
    [Autoplay({ delay: 2000, stopOnInteraction: true })] // Autoplay with gesture support
  );

  return (
    <div ref={emblaRef} className="w-full md:max-w-4xl overflow-hidden relative mx-auto">
      {/* Carousel content */}
      <div className="flex w-[80vw] md:w-full px-4 md:px-0">
        {lenderImages.map((image, index) => (
          <div
            key={index}
            className="w-[calc(100%/3)] md:w-[calc(100%/5)] flex-shrink-0 p-2" // 3 items on mobile, 5 on desktop, add padding
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={200}
              style={{ objectFit: "contain", aspectRatio: "1 / 1" }} // Maintain square aspect ratio
              className="shadow-lg border rounded-xl hidden md:block"
            />
            <Image
              src={image.src}
              alt={image.alt}
              width={150}
              height={150}
              style={{ objectFit: "contain", aspectRatio: "1 / 1" }} // Maintain square aspect ratio
              className=" border rounded-xl md:hidden"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
