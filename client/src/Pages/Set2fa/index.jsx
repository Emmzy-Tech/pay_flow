import React from "react";
import "../Login/login.css";

const setUpAuth = () => {
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
        <button type="submit" className="second__btn">
          continue
        </button>
      </div>
    </div>
  );
};

export default setUpAuth;
