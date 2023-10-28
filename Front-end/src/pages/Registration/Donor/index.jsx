import React from "react";
import { TextField, Button, Typography, Box, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import DialogBox from "../../../components/DialogBox";

import useCreatePharmacy from "../../../hooks/services/useCreateDonor";

import { AccountCircle } from "@material-ui/icons";

import { useStyles } from "./styles";

const PharmacyRegistration = ({
  openRegisterStudents,
  setOpenRegisterStudents,
}) => {
  const classes = useStyles();

  const closeDialog = () => {
    setOpenRegisterStudents(false);
  };

  const { mutateAsync: registerPharmacy } = useCreatePharmacy();

  const handleSubmit = (values) => {
    registerPharmacy(values);
    setOpenRegisterStudents(false);
  };

  return (
    <DialogBox
      title={"Register Pharmacy"}
      open={openRegisterStudents}
      setOpen={closeDialog}
      maxWidth="sm"
      height="800px"
      children={
        <Grid className={classes.container}>
          <AccountCircle className={classes.icon} />
          <Formik
            initialValues={{
              pharmacyName: "",
              location: "",
              email: "",
              phoneNumber: "",
              password: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validate={(values) => {
              const errors = {};
              if (!values.pharmacyName) {
                errors.pharmacyName = "Pharmacy Name is required";
              }
              if (!values.location) {
                errors.location = "Location is required";
              }
              if (!values.email) {
                errors.email = "Email is required";
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = "Phone number is required";
              }
              if (!values.password) {
                errors.password = "Password is required";
              }
              return errors;
            }}
          >
            {({ isValid = false }) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  name="pharmacyName"
                  label="Pharmacy Name"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="location"
                  label="Location"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  type="phoneNumber"
                />
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                />
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid} // Disable the button when the form is invalid
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
          {/* <Box className={classes.infoBox}>
            <Typography variant="body1">
              Information Box - Display some information here.
            </Typography>
          </Box> */}
        </Grid>
      }
    ></DialogBox>
  );
};

export default PharmacyRegistration;
