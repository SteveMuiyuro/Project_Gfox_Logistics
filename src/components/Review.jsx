import React from "react";
import StarRating from "./StarRating";

function Review({ review }) {
  return (
    <div className="review-sub-container">
      <div className="review-rating">
        <p className="user">{`${review.firstname} ${review.lastname}`}</p>
        <StarRating rating={review.rating} />
      </div>
      <p className="review-detail">{review.review}</p>
      <p className="review-time">{review.posting_date}</p>
    </div>
  );
}

export default Review;
