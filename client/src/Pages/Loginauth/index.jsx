import React from "react";
import "../Login/login.css";

const loginPwd = () => {
  return (
    <div className="login__container">
      <div className="form__container">
        <div className="password__field">
          <h2>Password</h2>
        

          <label htmlFor="password">
            Enter your password
          </label>
          <input
            type="password"
            name="password"
            id="user__password"
          />
          <button
            type="submit"
            id="password__btn"
            className="second__btn"
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default loginPwd;