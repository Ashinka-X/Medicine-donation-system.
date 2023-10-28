import React from "react";

import { Grid, Button, Divider, Box } from "@mui/material";

import LabeledChip from "../../../components/LabeledChip";
import EditIcon from "../../../components/EditIcon";
import DeleteIcon from "../../../components/DeleteIcon";

import { styles } from "../ListPharmacy/styles";

import useDeletePharmacy from "../../../hooks/services/useDeleteStock";
import useGetPharmacyDetails from "../../../hooks/services/usePharmacyDetails";

const OptionPanel = ({ values, location, pharmacyName }) => {
  const { mutateAsync: deletePharmacy } = useDeletePharmacy({ id: values.id });
  const { data: pharmacyDetails } = useGetPharmacyDetails({
    location: "",
    pharmacyName: "",
  });
  const handleDeletePharmacy = async () => {
    await deletePharmacy();
    pharmacyDetails();
  };
  const classes = styles();
  return (
    <Grid>
      {values?.quantity <= 0 ? (
        <LabeledChip label={"Excess"} backgroundColor={"#B5B5B5"} />
      ) : (
        <Button
          id="btn-delete-credential"
          variant="text"
          onClick={(e) => {
            handleDeletePharmacy();
          }}
          classes={classes.deleteBtn}
          startIcon={<DeleteIcon className={classes.menuIconRoot} />}
        >
          <span className={classes.btnText}>Delete</span>
        </Button>
      )}
    </Grid>
  );
};

export default OptionPanel;
