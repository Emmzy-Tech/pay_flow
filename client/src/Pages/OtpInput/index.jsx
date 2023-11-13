import React, { useRef } from "react";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";

const createInputRefs = () => {
  return Array.from({ length: 4 }, () => useRef(null));
};

const OtpInput = ({ isSignup }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isSignup) {
      navigate('/register/verified'); // Navigate to verified for signup
    } else {
      navigate('/dashboard'); // Navigate to dashboard for login
    }
    // navigate("/verified");
  };
  const inputRefs = createInputRefs();

  const moveToNext = (index) => {
    return () => {
      if (
        inputRefs[index].current.value &&
        index < inputRefs.length - 1
      ) {
        inputRefs[index + 1].current.focus();
      }
    };
  };

  return (
    <div className="login__container">
      <div className="form__container">
        <div className="main__otp--container">
          <h2>Email Veification</h2>
          <p>
            An email with an OTP has been sent to your email
            address pleas input the code below
          </p>
          <label htmlFor="">Enter a code</label> <br />
          <div className="otp__container">
            {inputRefs.map((inputRef, index) => (
              <input
                key={index}
                type="text"
                className="otp-input"
                maxLength="1"
                ref={inputRef}
                onInput={moveToNext(index)}
              />
            ))}
          </div>
          <button type="submit" onClick={handleClick} className="second__btn">
            verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
