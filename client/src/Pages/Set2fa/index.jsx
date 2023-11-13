import React from "react";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";

const SetUpAuth = () => {

const navigate = useNavigate();

const handleClick = () => {
    navigate("/register/otp");
  };

  return (
    <div className="login__container">
      <div className="two__container">
        <h2 className="twofa">
          Set-up 2factor Authentication{" "}
        </h2>
        <p className="twofap">
          This gives an extra layer of security to your
          account
        </p>
        <button type="submit" className="second__btn" onClick={handleClick}>
          continue
        </button>
      </div>
    </div>
  );
};

export default SetUpAuth;
