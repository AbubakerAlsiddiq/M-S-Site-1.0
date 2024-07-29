import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import "./Reviews.css";
import Footer from "./Footer";

interface Review {
  author: string;
  rating: number;
  content: string;
  date: string;
  reviewCount?: number;
  photoCount?: number;
  isLocalGuide?: boolean;
}

interface StarCount {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

const overallRating = 4.9;
const totalReviews = 52;
const starCounts: StarCount = { 5: 46, 4: 6, 3: 0, 2: 0, 1: 0 };

const sampleReviews: Review[] = [
  {
    author: "Devon Carrow",
    rating: 5,
    content:
      "The owner was so kind and generous with our two children. The store itself was so nice, offering a large variety of middle eastern decor, spices, teas, sweets and more. We can't wait to go back!",
    date: "18 weeks ago",
    reviewCount: 25,
    photoCount: 3,
  },
  {
    author: "Omar Albasha",
    rating: 5,
    content:
      "Very nice people. They have most of Mediterranean goods. Very clean place. I highly recommend it",
    date: "28 weeks ago",
    reviewCount: 175,
    photoCount: 165,
    isLocalGuide: true,
  },
  {
    author: "Jama Beasley",
    rating: 5,
    content:
      "After searching local markets within 30 miles of Chincoteague, VA, I found my desired loose tea leaves at the market!! Multiple choices from Turkey, India, Sri Lanka, etc. & good prices. The market has been redone, expanded, & well stocked over the past year. Delightful supply of spices, beans, grains, pastas, & canned or jar ready-to-eat. Fantastic sensorial experience for the eyes. I highly recommend the owner and sales agent who are warm, intelligent & helpful, if you need. Overall 5-star experience!",
    date: "33 weeks ago",
    reviewCount: 7,
    photoCount: 25,
    isLocalGuide: true,
  },
  {
    author: "Alexis Schrantz",
    rating: 5,
    content:
      "I love this place the owner is so welcoming and I love buying spices that I can't find in a regular grocery store….. I also love the falafel Pattie's and hummus",
    date: "40 weeks ago",
    reviewCount: 7,
    photoCount: 0,
  },
  {
    author: "Danny Smith",
    rating: 5,
    content:
      "The market is great and possibly the best Mediterranean market on the Delmarva Penninsula. Many African and Mediterranean products, foods and spices available. There is also a selection of serving trays, kettles, and tea cups and as if that is not enough they are now selling hookah and incense. Oh yes, and there is a Deli, how could I forget the Deli.",
    date: "Feb 8, 2023",
    reviewCount: 306,
    photoCount: 1064,
    isLocalGuide: true,
  },
];

const StarRating: React.FC<{ rating: number; showOneStar?: boolean }> = ({
  rating,
  showOneStar = false,
}) => {
  const starsToShow = showOneStar ? 1 : 5;
  return (
    <div className="star-rating">
      {[...Array(starsToShow)].map((_, i) => (
        <svg
          key={i}
          className={`star ${i < rating ? "filled" : ""}`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => (
  <div className="progress-bar">
    <div className="progress" style={{ width: `${percentage}%` }}></div>
  </div>
);

const handleWriteReview = () => {
  window.open("https://g.page/r/CYZGK0GwjVGUEAE/review", "_blank");
};

const ReviewCard: React.FC<Review> = ({
  author,
  rating,
  content,
  date,
  reviewCount,
  photoCount,
  isLocalGuide,
}) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <span className="author">{author}</span>
        {isLocalGuide && <span className="local-guide-badge">Local Guide</span>}
      </div>
      <div className="review-meta">
        <span>
          {reviewCount} reviews • {photoCount} photos
        </span>
      </div>
      <StarRating rating={rating} />
      <span className="review-date">{date}</span>
      <p className="review-content">{content}</p>
    </div>
  );
};

const Reviews: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="reviews-container">
        <div className="reviews-content">
          <div className="reviews-summary">
            <h2 className="reviews-title">Customer Reviews</h2>
            <div className="overall-rating">
              <span className="rating-number">{overallRating}</span>
              <StarRating rating={overallRating} />
              <span className="total-reviews">({totalReviews} reviews)</span>
            </div>
            <div className="star-breakdown">
              {([5, 4, 3, 2, 1] as const).map((star) => (
                <div key={star} className="star-row">
                  <span className="star-label">{star}</span>
                  <StarRating rating={1} showOneStar={true} />
                  <ProgressBar
                    percentage={(starCounts[star] / totalReviews) * 100}
                  />
                  <span className="star-percentage">
                    {Math.round((starCounts[star] / totalReviews) * 100)}%
                  </span>
                </div>
              ))}
            </div>
            <div className="write-review">
              <div className="write-review-title">
                Tell us about your visit!
              </div>
              <p className="write-review-description">
                Did you find everything you were looking for? How was your
                experience? Your feedback helps us serve you better and assists
                other shoppers.
              </p>
              <button
                className="write-review-button"
                onClick={handleWriteReview}
              >
                Write a review
              </button>
            </div>
          </div>

          <h3 className="testimonials-title">Review Testimonials</h3>
          <div className="review-list">
            {sampleReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Reviews;
