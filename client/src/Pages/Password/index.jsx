import React, { useState } from "react";
import "../Login/login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { devServer } from "../../Constants/apiUrl";

const Password = () => {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleSetPassword = (value) => {
    setPassword(value);
  };

  const handleSetConfirmPassword = (value) => {
    setCPassword(value);
  };

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("emailforpasswordsetting");

    if (password.length <= 6) {
      toast.error("password cannot be less than 6 characters", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    } else if (password !== cPassword) {
      toast.error("password does not match", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
    } else if (!email) {
      toast.error("please return to signup page and input email", {
        position: toast.POSITION.TOP_RIGHT,
        closeOnClick: true,
        draggable: true,
        theme: "dark",
      });
      navigate("/register");
    } else {
      axios
        .post(
          `${devServer}/auth/add-password`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            navigate("/register/twofactorauth");
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
  return (
    <div className="login__container">
      <div className="form__container">
        <div className="password__field">
          <h2>Password</h2>
          <p>Enter a password to secure your account</p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="user__password"
            onChange={(e) => handleSetPassword(e.target.value)}
          />
          <label htmlFor="user__password">Confirm your Password</label>
          <input
            type="password"
            name="password"
            id="user__password"
            onChange={(e) => handleSetConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            id="password__btn"
            className="second__btn"
            onClick={handleClick}
          >
            continue
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Password;
