import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataContacts } from "../../../Assets/Data/mockData";
import Header from "../../../Components/Header";
import { useTheme } from "@mui/material";

const Payouts = () => {
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
        title="Payouts"
        subtitle="List of Employees to pay"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Payouts;
