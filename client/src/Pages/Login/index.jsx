import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import googleLogo from "../../Assets/google.png";

const Login = () => {
  function delay() {
    setTimeout(2000);
  }
  return (
    <div className="login__container">
      <div className="form__container">
        <form action="" className="log">
          <h2>Login</h2>
          <p>We are happy to have you back</p>
          <button className="first__btn">
            <img src={googleLogo} alt="" srcset="" className="google-logo" />
            Sign in with Google
          </button>
          <br />
          <div className="line-container">
            <div className="line"></div>
            <span>or</span>
            <div className="line"></div>
          </div>

          <div className="email__container">
            <br />
            <label htmlFor="email">Email Address</label>

            <input type="email" name="email" id="user__email" />
          </div>
          <br />
          <br />
          <button className="second__btn" type="submit">
            Login
          </button>

          <p className="alt">
            Don't have an account?{" "}
            <Link to="/register" className="link" onClick={delay}>
              {" "}
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
