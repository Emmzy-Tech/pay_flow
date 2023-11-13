import React from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/loginauth");
  };

  return (
    <div className="login__container">
      <div className="form__container">
        <form action="" className="log">
          <h2>Login</h2>
          <p>We are happy to have you back</p>

          <div className="email__container">
            <br />
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              name="email"
              id="user__email"
              placeholder="Johndoe@email.com"
            />
          </div>
          <br />
          <br />
          <button className="second__btn"onClick={handleClick} type="submit">
            Login
          </button>

          <p className="alt">
            Don't have an account?
            <Link to="/register" className="link">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
