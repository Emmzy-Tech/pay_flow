import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import googleLogo from '../Assets/google.png'


const Login = () => {




    return (
        <div className="form__container">
        <form action="" >
          <h2>Login</h2>
          <p>We are happy to have you back</p>
          <button className="first__btn">
              <img src={googleLogo} alt="" srcset="" className="google-logo"/>
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
  
            <input
              type="email"
              name="email"
              id="user__email"
              
            />
          </div>
        <br /><br />
          <button className="second__btn" type="submit">Login</button>
  
          <p className="alt">
           Don't  have an account? <Link to='/signUp' className="link"  > Sign Up</Link>
          </p>
        </form>
      </div>  
    )
}


export default Login;