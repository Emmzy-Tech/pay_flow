import React from "react";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };
  return (
    <div className="login__container">
      <div className="details__container">
        <div className="sub__details--container">
          <h2>Personal Information</h2>
          <p>We want to know you better 😊😊</p>
          <label htmlFor="details">First Name</label>
          <input
            type="text"
            id="user__details"
            name="details"
          />
          <label htmlFor="details">Last Name</label>
          <input
            type="text"
            id="user__details"
            name="details"
          />
          <label htmlFor="details">
            Other Names(optional)
          </label>
          <input
            type="text"
            id="user__details"
            name="details"
          />
          <label htmlFor="details">Position</label>
          <input
            type="text"
            id="user__details"
            name="details"
          />
          <button
            className="second__btn"
            onClick={handleClick}
            type="submit"
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
