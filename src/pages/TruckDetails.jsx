import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import trucksFinder from "../../trucksFinder";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";
import Review from "../components/Review";

export default function TruckDetails() {
  const [truckData, setTruckData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    async function truckDetails() {
      setLoading(true);
      try {
        const data = await trucksFinder.get(`/${id}`);
        setTruckData(data.data.truckInfo[0]);
        setReviews(data.data.reviews);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    truckDetails();
  }, [id]);

  const postedReviews = reviews?.map((review) => <Review review={review} />);

  const search = location.state?.search || "";

  if (loading) {
    return <p>Loading Data...</p>;
  }

  if (error) {
    <h2>There was an error whiel fetching data:{error.message}</h2>;
  }
  return (
    <div className="truck-details">
      <div className="hire-truck-details">
        <Link to={`..${search}`} relative="path" className="back-button">
          &larr;{" "}
          <span>{`Back to ${location.state?.type || "all trucks"}`}</span>
        </Link>

        <img src={truckData.truck_image} className="truck-image-details" />
        <p className="description-header">Description:</p>
        <p className="description">{truckData.truck_description}</p>
        <p>
          <span>Price/Day:</span>
          {truckData.price?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p>
          <span>Capacity:</span> {truckData.tonnage} Tonnes
        </p>
        <i className="truck-type">
          <span>Type:</span>
          {truckData.type}
        </i>
        <div className="star-rating">
          <span>Average Rating:</span>
          <StarRating rating={truckData.average_rating} />
        </div>
        <div className="review-sub-container">
          <span>Reviews</span>
          {postedReviews}
        </div>
        <button className="hire-btn">Hire Truck</button>
      </div>

      <AddReview />
    </div>
  );
}
