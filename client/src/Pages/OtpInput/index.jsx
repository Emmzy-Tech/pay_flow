import React, { useRef } from "react";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { devServer } from "../../Constants/apiUrl";

const createInputRefs = () => {
  return Array.from({ length: 4 }, () => useRef(null));
};

const OtpInput = ({ isSignup }) => {
  const inputRefs = createInputRefs();

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const otpValues = inputRefs.map((ref) => ref.current.value);
    console.log(otpValues.join(""));

    const email = localStorage.getItem("emailforpasswordsetting");

    if (!email) {
      toast.error("please return to signup page and input email", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
      navigate("/register");
    } else if (inputRefs.length !== 4) {
      toast.error("otp must be 4 charactersl", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      axios
        .post(
          `${devServer}/auth/verify-otp`,
          { email, otp: otpValues.join("") },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            if (isSignup) {
              navigate("/register/verified"); // Navigate to verified for signup
            } else {
              navigate("/dashboard"); // Navigate to dashboard for login
            }
          } else if (
            response.data.message ===
            "otp is not valid or has expired, request for another"
          ) {
            navigate("/register");
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              closeOnClick: true,
              draggable: true,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          console.error("An erorr occured", error);
          toast.error("An error occurred. Please try again later.", {
            position: toast.POSITION.TOP_RIGHT,
            closeOnClick: true,
            draggable: true,
            theme: "dark",
          });
        });
    }
  };

  const moveToNext = (index) => {
    return () => {
      if (inputRefs[index].current.value && index < inputRefs.length - 1) {
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
            An email with an OTP has been sent to your email address pleas input
            the code below
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
      <ToastContainer />
    </div>
  );
};

export default OtpInput;
