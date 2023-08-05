import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Pricing() {
  const { truck } = useOutletContext();

  return truck ? (
    <div className="pricing">
      <p>
        <span className="price">
          {truck.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        /day
      </p>
    </div>
  ) : (
    <p>Loading...</p>
  );
}
