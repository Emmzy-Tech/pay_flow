import React from "react";
import "../App.css";

const password = () => {
  return (
    <div className="form__container">
      <div className="password__field">
        <h2>Password</h2>
        <p>Enter a password to secure your account</p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="user__password"
          />
          <label htmlFor="user__password">
            Confirm your Password
          </label>
          <input
            type="password"
            name="password"
            id="user__password"
          />
          <button type="submit" id="password__btn" className="second__btn">
            continue
          </button>
      </div>
    </div>
  );
};

export default password;
