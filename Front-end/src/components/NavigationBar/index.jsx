import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { AppContext } from "../AppContext.js";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";

import { Logout } from "@mui/icons-material";

import { styles } from "./styles";

import { ROLE } from "../../constants.js";

const NavigationBar = () => {
  const classes = styles();

  const { role, id } = useContext(AppContext);

  return (
    <>
      <AppBar position="sticky">
        <CssBaseline />
        <Toolbar>
          <Typography className={classes.logo}>
            Medicine Donation System
          </Typography>
          <div className={classes.navlinks}>
            <Link to="/orders" className={classes.link}>
              Orders
            </Link>
            <Link to="/medicine" className={classes.link}>
              Medicine
            </Link>
            {/* <Link to="/invoice" className={classes.link}>
              Invoice
            </Link> */}
            {ROLE.ADMIN === role && (
              <Link to="/pharmacy" className={classes.link}>
                Pharmacy
              </Link>
            )}
            {ROLE.ADMIN === role && (
              <Link to="/user" className={classes.link}>
                User
              </Link>
            )}
            <Link to="/" className={classes.link}>
              <Logout />
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Grid className={classes.children}>
        <Outlet />
      </Grid>
    </>
  );
};
export default NavigationBar;
