import React from "react";
import verificationIcon from "../../Assets/Verified.png";
import "../Login/login.css";
import {useNavigate} from 'react-router-dom';

const VerifyUser = () => {

const navigate = useNavigate();

const handleClick = () => {
  navigate("/info")
}
  return (
    <div className="login__container">
      <div className="two__container">
        <img
          src={verificationIcon}
          alt=""
          className="verify__icon"
        />
        <h2 className="twofa">Verification Complete</h2>
        <p className="twofap">
          Your account has been veified now you need to fill
          in some<br></br> details for us
        </p>
        <button onClick={handleClick} type="submit" className="second__btn">
          Continue
        </button>
        <a href="/" className="skip">Skip</a>
      </div>
    </div>
  );
};

export default VerifyUser;
