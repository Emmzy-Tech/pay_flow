import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../Assets/Data/mockData";
// import DashNav from "../DashNav/DashNav";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmptyPlaceholder from "../../EmptyPlaceholder/EmptyPlaceholder";
import Header from "../../Header";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaidIcon from '@mui/icons-material/Paid';
import LineChart from "../../Charts/LineChart";
// import GeographyChart from "../../Charts/GeographyChart";
import BarChart from "../../Charts/BarChart";
import StatBox from "../../Charts/StatBox";
import ProgressCircle from "../../Charts/ProgressCircle";

const DashboardHome = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      </Box>

      <div className="flex-col md:flex-row w-full flex justify-around gap-3"
      >
        {/* ROW 1 */}
        <Box
          className="w-full md:w-[33%] p-7 overflow-auto"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="N12,361,000"
            subtitle="Balance"
            progress="0.8"
            increase="+14%"
            icon={
              <AccountBalanceIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
        <Box
          className="w-full md:w-[33%] p-7 overflow-auto"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="82"
            subtitle="Employees"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          className="w-full md:w-[33%] p-7 overflow-auto"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Payouts"
            progress="0.80"
            increase="+43%"
            icon={
              <PaidIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        </div>

        {/* ROW 2 */}
        <div className="flex-col md:flex-row w-full flex justify-around gap-3 mt-4">
        <Box
        className="w-full md:w-[70%] p-7 h-[40vh] overflow-auto"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
          className=""
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="205" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          className="w-full md:w-[30%] p-7 h-[40vh] overflow-auto"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
        </div>
      


    </Box>
  );
};

export default DashboardHome;
