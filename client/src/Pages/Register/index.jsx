import React from "react";
import "../Login/login.css";
// import googleLogo from '../../Assets/google.png'
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom'

const Register = () => {

const navigate = useNavigate();

const handleClick = () => {
    navigate("/register/password")
  }  

  return (
    <div className="login__container">
    <div className="form__container">
      <form action="" className="log">
        <h2>Sign Up</h2>
        <p>We are excited to have you join us</p>
        {/* <button className="first__btn">
            <img src={googleLogo} alt="" srcset="" className="google-logo"/>
          Sign in with Google
        </button> */}
        {/* <br /> */}
        {/* <div className="line-container">
          <div className="line"></div>
          <span>or</span>
          <div className="line"></div>
        </div> */}

        <div className="email__container">
          <br />
          <label htmlFor="email">Email Address</label>

          <input
            type="email"
            name="email"
            id="user__email"
            placeholder="Note: the email used should be a company or work mail"
          />
        </div>
        <div className="agree">
          <input type="checkbox" name="" id="" />
          <p>
            By checking this box you have agreed to our
            <a href="/signup  " className="link"> Privacy Terms and Conditions</a>
          </p>
        </div>
        <button className="second__btn" type="submit" onClick={handleClick}>Sign Up</button>

        <p className="alt">
          Have an account? <Link to="/login" className="link" >Login here</Link>
        </p>
      </form>
    </div>
        </div>
  );
};

export default Register;
