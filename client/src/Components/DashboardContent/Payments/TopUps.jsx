import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataContacts } from "../../../Assets/Data/mockData";
import Header from "../../../Components/Header";
import { useTheme } from "@mui/material";

const TopUps = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "invoicenum",
      headerName: "Invoice Number",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "employee",
      headerName: "Employee",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "paymentdate",
      headerName: "Payment Date",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 1,
    },
    {
      field: "pay",
      headerName: "Pay",
      flex: 1,
    }
  ];

  return (
    <Box m="20px">
      <Header
        title="Top Up"
        subtitle="Top up balance"
      />
      
    </Box>
  );
};

export default TopUps;
