import React from "react";
import { TextField, Button, Typography, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import useCreateUser from "../../../hooks/services/useCreateUser";

import DialogBox from "../../../components/DialogBox";

import { AccountCircle } from "@material-ui/icons";

import { useStyles } from "./styles";

const UserRegistration = ({ openRegisterTeacher, setOpenRegisterTeacher }) => {
  const classes = useStyles();
  const { mutateAsync: registerUser } = useCreateUser();

  const handleSubmit = (values) => {
    registerUser(values);
    setOpenRegisterTeacher(false);
  };

  const closeDialog = () => {
    setOpenRegisterTeacher(false);
  };

  return (
    <DialogBox
      title={"Register User"}
      open={openRegisterTeacher}
      setOpen={closeDialog}
      maxWidth="sm"
      height="700px"
      children={
        <Grid className={classes.container}>
          <AccountCircle className={classes.icon} />
          <Typography variant="h4" className={classes.heading}>
            Register User
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              location: "",
              phoneNumber: "",
              age: "",
              gender: "",
              nationalIdentityNumber: "",
            }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = "Name is required";
              }
              if (!values.email) {
                errors.email = "Email is required";
              }
              if (!values.password) {
                errors.password = "Password is required";
              }
              if (!values.location) {
                errors.location = "Location is required";
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = "Phone Number is required";
              }
              if (!values.age) {
                errors.age = "Age is required";
              }
              if (!values.nationalIdentityNumber) {
                errors.nationalIdentityNumber =
                  "National identity number is required";
              }
              if (!values.gender) {
                errors.gender = "Gender is required";
              }
              return errors;
            }}
          >
            {({ isValid = false }) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="age"
                  label="Age"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="gender"
                  label="Gender"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="nationalIdentityNumber"
                  label="National Identity Number"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="phoneNumber"
                  label="Phone Number"
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
                  name="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                />
                <Field
                  as={TextField}
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  disabled={!isValid} // Disable the button when the form is invalid
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      }
    />
  );
};

export default UserRegistration;
