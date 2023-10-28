import React, { useContext } from "react";

import { Button } from "@mui/material";

import { AppContext } from "../../../components/AppContext.js/index.jsx";
import { Add } from "@material-ui/icons";

import { styles } from "../list-orders/styles";

import { ROLE } from "../../../constants.js";

import useDeliverMedicine from "../../../hooks/services/useDeliveryMedicine.js";

const OptionPanel = ({ values, setReftch, refetch }) => {
  const { role, id } = useContext(AppContext);
  const classes = styles();

  const { mutateAsync: updateMedicine } = useDeliverMedicine({ id: values.id });

  const handleMarkAsDelivered = async () => {
    await updateMedicine();
    setReftch(!refetch);
  };
  return (
    <>
      {role === ROLE.PHARMACY && (
        <Button
          id="btn-delivered-credential"
          variant="text"
          onClick={(e) => {
            handleMarkAsDelivered();
          }}
          classes={classes.deleteBtn}
          startIcon={<Add className={classes.menuIconRoot} />}
        >
          <span className={classes.btnText}>Delivered</span>
        </Button>
      )}
    </>
  );
};

export default OptionPanel;
