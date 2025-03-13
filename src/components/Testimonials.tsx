import { useEffect, useState } from 'react';
import Google from '../../public/images/google_icon.svg';
import { Star, StarHalf, ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import { reviews } from '@/lib/reviews'; // Import static reviews

export default function ReviewsSection() {
  interface Review {
    author_name: string;
    text: string;
    rating: number;
  }

  const [rating, setRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Index for chevron navigation
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // Selected review for modal

  // Store window width to check responsive layout
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    async function fetchRatingData() {
      try {
        const response = await fetch('/api/review');
        const data = await response.json();
        if (data.result) {
          setRating(data.result.rating);
          setTotalReviews(data.result.user_ratings_total);
        }
      } catch (error) {
        console.error('Error fetching rating data:', error);
      }
    }
    fetchRatingData();

    // Detect window width on client-side only
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      // Update the width on window resize
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      // Cleanup the event listener
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleNext = () => {
    const itemsToShow = windowWidth && windowWidth < 768 ? 1 : 3;
    setCurrentIndex((prevIndex) =>
      (prevIndex + itemsToShow) % reviews.length
    );
  };

  const handlePrev = () => {
    const itemsToShow = windowWidth && windowWidth < 768 ? 1 : 3;
    setCurrentIndex((prevIndex) =>
      (prevIndex - itemsToShow + reviews.length) % reviews.length
    );
  };

  const openModal = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const renderSmallStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.7 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} fill="#083784" strokeWidth={0} size={16} />
        ))}
        {halfStar === 1 && <StarHalf fill="#083784" strokeWidth={0} size={16} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={i + fullStars + 1} fill="none" stroke="#083784" size={16} />
        ))}
      </>
    );
  };

  return (
    <section className="reviews-section py-6 px-4 flex flex-col items-center justify-between max-w-[1280px] mx-auto md:flex-row">
      {/* Left Column for Google Review Info */}
      <div className="flex flex-col items-center space-y-3 mb-4 md:mb-0 md:min-w-[200px]">
        <div className="flex items-center space-x-2">
          <Google className="w-8 h-8 md:w-10 md:h-10" />
          <p className="text-sm md:text-lg">Google Reviews</p>
        </div>

        <div className="flex items-center">
          {rating !== null ? (
            <>
              {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                <Star key={i} fill="#083784" strokeWidth={0} size={20} />
              ))}
              {rating % 1 >= 0.7 && <StarHalf fill="#083784" strokeWidth={0} size={20} />}
            </>
          ) : 'Loading...'}
        </div>

        <p className="text-sm md:text-md">
          {rating ? `${rating} stars` : 'Loading...'} | {totalReviews ? `${totalReviews} reviews` : 'Loading...'}
        </p>
      </div>

      {/* Testimonials with Responsive Layout */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <button onClick={handlePrev} className="text-black">
          <ChevronLeft size={30} />
        </button>

        {/* Grid that changes from 1 item on mobile to 3 items on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.slice(currentIndex, currentIndex + (windowWidth && windowWidth < 768 ? 1 : 3)).map((review, index) => (
            <div key={index} className="review-card p-4 shadow-md rounded-md max-w-xs border-gray border flex flex-col justify-between lg:min-h-[8vw] max-h[8vw] lg:max-h-[8vw]"> {/* Fixed height */}
              <div className="flex items-center mb-1">
                {renderSmallStars(review.rating)}
              </div>
              <p className="text-sm mb-2 overflow-hidden"> {/* Add overflow-hidden */}
                &quot;
                {review.text.length > 100 ? review.text.substring(0, 100) + '...' : review.text}
                &quot;
              </p>
              <div className="flex items-center justify-between mt-auto"> {/* Push content to the bottom */}
                <p className="text-xs md:text-xs">{review.author_name}</p>
                {review.text.length > 100 && (
                  <button onClick={() => openModal(review)} className="ml-2 flex items-center text-xs text-blue-500">
                    Read more
                    <ArrowRight size={10} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button onClick={handleNext} className="text-black">
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Modal for full review */}
      {isModalOpen && selectedReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 md:mx-0 overflow-y-auto max-h-[90vh]"> {/* Adjust padding, max height, overflow, and aspect ratio */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-bold">{selectedReview.author_name}</h2>
              <button onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm md:text-base">{selectedReview.text}</p>
              <div className="flex items-center mt-4">
                {renderSmallStars(selectedReview.rating)}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}