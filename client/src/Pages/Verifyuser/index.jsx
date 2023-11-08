import React from "react";
import verificationIcon from "../../Assets/Verified.png";
import "../Login/login.css";

const verifyUser = () => {

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
        <button id="verify__btn" type="submit" className="second__btn">
          continue
        </button>
        <a href="/" className="skip">Skip</a>
      </div>
    </div>
  );
};

export default verifyUser;
