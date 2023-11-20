// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './styles.module.css'; // Replace with the correct path to your CSS module file

// const Aside = () => {
//   return (
//     <aside>
//       <div className={styles.top}>
//         <div className={styles.logo}>
//           {/* <img src="logo.png" alt="" /> */}
//           <h2>
//             Capacity<span className={styles.danger}>Bay</span>
//           </h2>
//         </div>
//         <div className={styles.close} id="close-btn">
//           <span className="material-icons-sharp"> close </span>
//         </div>
//       </div>

//       <div className={styles.sidebar}>
//         <Link to="/" className={styles.active}>
//           <span className="material-icons-sharp"> home </span>
//           <h3>Home</h3>
//         </Link>
//         <Link to="/investment" className={styles.investment}>
//           <span className="material-icons-sharp"> savings </span>
//           <h3>Investment Plan</h3>
//         </Link>
//         <Link to="/profile" className={styles.profile}>
//           <span className="material-icons-sharp"> group </span>
//           <h3>Profile</h3>
//         </Link>
//         <Link to="/deposit" className={styles.deposit}>
//           <span className="material-icons-sharp"> payments </span>
//           <h3>Deposit</h3>
//         </Link>
//         <Link to="/deposit-history" className={styles.depositHistory}>
//           <span className="material-icons-sharp"> account_balance_wallet </span>
//           <h3>Deposit History</h3>
//           <span className={styles['message-count']}>26</span>
//         </Link>
//         <Link to="/withdraw" className={styles.withdraw}>
//           <span className="material-icons-sharp"> savings </span>
//           <h3>Withdraw</h3>
//         </Link>
//         <Link to="/withdraw-history" className={styles.withdrawHistory}>
//           <span className="material-icons-sharp"> price_change </span>
//           <h3>Withdraw History</h3>
//         </Link>
//         <Link to="/bonus" className={styles.bonus}>
//           <span className="material-icons-sharp"> account_balance_wallet </span>
//           <h3>Bonus</h3>
//         </Link>
//         <Link to="/penalty" className={styles.penalty}>
//           <span className="material-icons-sharp"> account_balance_wallet </span>
//           <h3>Penalty</h3>
//         </Link>
//         <Link to="/referrals" className={styles.referrals}>
//           <span className="material-icons-sharp"> badge </span>
//           <h3>Referrals</h3>
//         </Link>
//         <Link to="/change-password" className={styles.changePassword}>
//           <span className="material-icons-sharp"> lock </span>
//           <h3>Change Password</h3>
//         </Link>
//         <Link to="/logout" className={styles.logout}>
//           <span className="material-icons-sharp"> logout </span>
//           <h3>Logout</h3>
//         </Link>
//       </div>
//     </aside>
//   );
// };

// export default Aside;

import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const ASidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Payflow
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                {/* <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography> */}
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Welcome HR
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Employees"
              to="/dashboard/employees"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Employee"
              to="/dashboard/add-employee"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Invoices"
              to="/dashboard/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Payments
            </Typography>
            <Item
              title="All transactions"
              to="/dashboard/transactions"
              icon={<ReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Payouts"
              to="/dashboard/payouts"
              icon={<PaymentsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Top-ups"
              to="/dashboard/top-up"
              icon={<AttachMoneyIcon  />}
              selected={selected}
              setSelected={setSelected}
            />

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default ASidebar;
