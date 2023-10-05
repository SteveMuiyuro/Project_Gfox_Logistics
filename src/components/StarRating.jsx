import React from "react";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";

function StarRating({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<BsStarFill className="star" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<BsStarHalf className="star" />);
    } else {
      stars.push(<BsStar className="star" />);
    }
  }

  return (
    <div className="rating">
      <p>{stars}</p>
    </div>
  );
}

export default StarRating;
