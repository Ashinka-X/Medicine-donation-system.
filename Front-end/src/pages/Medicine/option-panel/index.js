import React from "react";

import { Grid, Button, Divider, Box } from "@mui/material";

import EditIcon from "../../../components/EditIcon";
import DeleteIcon from "../../../components/DeleteIcon";

import { styles } from "../ListMedicine/styles";

import { ROLE } from "../../../constants";

import { SelectAll } from "@material-ui/icons";

import useAddMedicine from "../../../hooks/services/useAddMedicine";

import useDeleteMedicine from "../../../hooks/services/useDeleteMedicine";

const OptionPanel = ({ values, role, id, medicineData }) => {
  const classes = styles();

  const { mutateAsync: addMedicine } = useAddMedicine();
  const { mutateAsync: deleteMedicine } = useDeleteMedicine({ id: values?.id });

  const handleAddMedicine = () => {
    const orderList = {
      medicineId: values.id,
      patientId: id,
    };
    addMedicine(orderList);
  };

  const handleDeleteMedicine = async () => {
    await deleteMedicine();
  };
  return (
    <Grid>
      {role !== ROLE.USER ? (
        <Button
          id="btn-delete-credential"
          variant="text"
          onClick={(e) => {
            handleDeleteMedicine();
            e.stopPropagation();
          }}
          classes={classes.deleteBtn}
          startIcon={<DeleteIcon className={classes.menuIconRoot} />}
        >
          <span className={classes.btnText}>Delete</span>
        </Button>
      ) : (
        <Box>
          <Button
            id="btn-add"
            variant="text"
            onClick={(e) => {
              handleAddMedicine();
            }}
            startIcon={<SelectAll className={classes.menuIconRoot} />}
          >
            <span className={classes.btnText}>ADD</span>
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default OptionPanel;
