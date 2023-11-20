import React from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../Components/Header";
import { Banks } from "../../../Assets/Data/banks";

const AddEmployee = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="Add Employee" subtitle="Create a New Employee Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Other Name (Optional)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.otherName}
                name="otherName"
                error={!!touched.otherName && !!errors.otherName}
                helperText={touched.otherName && errors.otherName}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl
                sx={{ gridColumn: "span 2" }}
                fullWidth
                variant="filled"
              >
                <InputLabel id="demo-multiple-name-label">Role</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  label="Select Option"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  name="role"
                  error={!!touched.role && !!errors.role}
                  helperText={touched.role && errors.role}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value={"frontend developer"}>
                    Fronteend Developer
                  </MenuItem>
                  <MenuItem value={"designer"}>Designer</MenuItem>
                  <MenuItem value={"project manager"}>Project Manager</MenuItem>
                  <MenuItem value={"backend developer"}>
                    Backend Developer
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl
                sx={{ gridColumn: "span 2" }}
                fullWidth
                variant="filled"
                error={!!touched.selectValue && !!errors.selectValue}
              >
                <InputLabel id="demo-multiple-name-label">
                  Select bank
                </InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  label="Select Option"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bankName}
                  name="bankName"
                  error={!!touched.bankName && !!errors.bankName}
                  helperText={touched.bankName && errors.bankName}
                  sx={{ gridColumn: "span 2" }}
                >
                  {Banks.map((bank, idx) => (
                    <MenuItem value={bank.code} key={idx}>
                      {bank.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Account Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.accountNumber}
                name="accountNumber"
                error={!!touched.accountNumber && !!errors.accountNumber}
                helperText={touched.accountNumber && errors.accountNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl
                sx={{ gridColumn: "span 2" }}
                fullWidth
                variant="filled"
              >
                <InputLabel id="demo-multiple-name-label"
                error={!!touched.accountNumber && !!errors.accountNumber}>Payment Duration</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  label="Select Option"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.paymentDuration}
                  name="paymentDuration"
                error={!!touched.paymentDuration && !!errors.paymentDuration}
                helperText={touched.paymentDuration && errors.paymentDuration}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value={"frontend developer"}>
                    Fronteend Developer
                  </MenuItem>
                  <MenuItem value={"weekly"}>Weekly</MenuItem>
                  <MenuItem value={"monthly"}>Monthly</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Employee
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  otherName: yup.string().required("required"),
  role: yup.string().required("required"),
  bankName: yup.string().required("required"),
  amount: yup.string().required("required"),
  accountNumber: yup.string().required("required"),
  paymentDuration: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  otherName: "",
  role: "",
  bankName: "",
  amount: "",
  accountNumber: "",
  paymentDuration: "",
};

export default AddEmployee;
