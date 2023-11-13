import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'; // Replace with the correct path to your CSS module file

const Aside = () => {
  return (
    <aside>
      <div className={styles.top}>
        <div className={styles.logo}>
          {/* <img src="logo.png" alt="" /> */}
          <h2>
            Capacity<span className={styles.danger}>Bay</span>
          </h2>
        </div>
        <div className={styles.close} id="close-btn">
          <span className="material-icons-sharp"> close </span>
        </div>
      </div>

      <div className={styles.sidebar}>
        <Link to="/" className={styles.active}>
          <span className="material-icons-sharp"> home </span>
          <h3>Home</h3>
        </Link>
        <Link to="/investment" className={styles.investment}>
          <span className="material-icons-sharp"> savings </span>
          <h3>Investment Plan</h3>
        </Link>
        <Link to="/profile" className={styles.profile}>
          <span className="material-icons-sharp"> group </span>
          <h3>Profile</h3>
        </Link>
        <Link to="/deposit" className={styles.deposit}>
          <span className="material-icons-sharp"> payments </span>
          <h3>Deposit</h3>
        </Link>
        <Link to="/deposit-history" className={styles.depositHistory}>
          <span className="material-icons-sharp"> account_balance_wallet </span>
          <h3>Deposit History</h3>
          <span className={styles['message-count']}>26</span>
        </Link>
        <Link to="/withdraw" className={styles.withdraw}>
          <span className="material-icons-sharp"> savings </span>
          <h3>Withdraw</h3>
        </Link>
        <Link to="/withdraw-history" className={styles.withdrawHistory}>
          <span className="material-icons-sharp"> price_change </span>
          <h3>Withdraw History</h3>
        </Link>
        <Link to="/bonus" className={styles.bonus}>
          <span className="material-icons-sharp"> account_balance_wallet </span>
          <h3>Bonus</h3>
        </Link>
        <Link to="/penalty" className={styles.penalty}>
          <span className="material-icons-sharp"> account_balance_wallet </span>
          <h3>Penalty</h3>
        </Link>
        <Link to="/referrals" className={styles.referrals}>
          <span className="material-icons-sharp"> badge </span>
          <h3>Referrals</h3>
        </Link>
        <Link to="/change-password" className={styles.changePassword}>
          <span className="material-icons-sharp"> lock </span>
          <h3>Change Password</h3>
        </Link>
        <Link to="/logout" className={styles.logout}>
          <span className="material-icons-sharp"> logout </span>
          <h3>Logout</h3>
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
