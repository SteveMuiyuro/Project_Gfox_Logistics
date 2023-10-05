import React, { useState } from "react";
import trucksFinder from "../../trucksFinder";
import { useParams } from "react-router-dom";

function AddReview() {
  const [reviewData, setReviewData] = useState({
    firstname: "",
    lastname: "",
    rating: "Select Rating",
    review: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  }

  const { id } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await trucksFinder.post(`/${id}/addReview`, {
        firstname: reviewData.firstname,
        lastname: reviewData.lastname,
        rating: reviewData.rating,
        review: reviewData.review,
      });
      setReviewData({
        firstname: "",
        lastname: "",
        rating: "Select Rating",
        review: "",
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="reviews-form-container">
      <form action="" className="reviews-details" onSubmit={handleSubmit}>
        <p className="review-header">Post a Review</p>
        <input
          type="text"
          name="firstname"
          id=""
          placeholder="Firstname"
          value={reviewData.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          id=""
          placeholder="Lastname"
          value={reviewData.lastname}
          onChange={handleChange}
        />
        <select
          name="rating"
          value={reviewData.rating}
          onChange={handleChange}
          className="rating-select"
        >
          <option disabled>Select Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <textarea
          placeholder="Write a reviews"
          name="review"
          value={reviewData.review}
          onChange={handleChange}
        ></textarea>
        <button className="review-submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default AddReview;
