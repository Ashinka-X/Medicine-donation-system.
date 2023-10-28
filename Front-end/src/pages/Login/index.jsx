import React, { useContext, useEffect } from "react";
import { AppContext } from "../../components/AppContext.js";

import { useSnackbar } from "notistack";

import { TextField, Button, Typography, Box, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

import { AccountCircle } from "@material-ui/icons";

import { useStyles } from "./styles";

import { ROLE } from "../../constants.js";

import useGetUsers from "../../hooks/services/useGetUsers.js";
import useGetPharmacyDetails from "../../hooks/services/usePharmacyDetails.js";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { role, setRole, setId, id } = useContext(AppContext);

  const { data: userDetails } = useGetUsers();

  const { data: pharmacyDetails } = useGetPharmacyDetails({
    pharmacyName: "",
    location: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    setRole("");
    setId("");
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };
  const authentication = (values) => {
    const validateUser = userDetails?.find(
      (element) =>
        element.email === values.email && element.password === values.password
    );
    const validatePharmacy = pharmacyDetails?.find(
      (element) =>
        element.email === values.email && element.password === values.password
    );
    if (validateUser) {
      setRole(ROLE.USER);
      setId(validateUser.id);
    } else if (validatePharmacy) {
      setId(validatePharmacy.id);
      setRole(ROLE.PHARMACY);
    }

    return validateUser || validatePharmacy;
  };

  const handleSubmit = async (values, actions) => {
    const validation = await authentication(values);

    if (values.email === "ashinka@gmail.com" && values.password === "ashinka") {
      setRole("ADMIN");
      setEnqueueSnackbar("Admin Logged in Succesfully", "success");
      navigate("/medicine");
    } else if (validation) {
      if (role === "USER") {
        setEnqueueSnackbar("Loged in as a user", "success");
        navigate("/medicine");
      } else if (role === "PHARMACY") {
        setEnqueueSnackbar("Loged in as pharmacy", "success");
        navigate("/medicine");
      }
    } else {
      setEnqueueSnackbar("Account not found", "error");
    }
  };

  return (
    <Grid className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        Medicine Donation System
      </Typography>
      <AccountCircle className={classes.icon} />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, action) => {
          handleSubmit(values, action);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
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
              type="email"
              name="email"
              label="Email"
              variant="outlined"
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default Login;
