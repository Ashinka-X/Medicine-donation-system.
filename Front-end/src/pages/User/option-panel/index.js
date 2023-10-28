import React from "react";
import { useQueryClient } from "react-query";

import { Grid, Button, Divider, Box } from "@mui/material";

import EditIcon from "../../../components/EditIcon";
import DeleteIcon from "../../../components/DeleteIcon";

import { styles } from "../list-user/styles";

import useDeleteUser from "../../../hooks/services/useDeleteUser";

const OptionPanel = ({ values, enabled, setEnabled }) => {
  const classes = styles();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteUser } = useDeleteUser({ id: values.id });

  const handleDeleteUser = async () => {
    await deleteUser();
    setEnabled(true);
  };
  return (
    <Button
      id="btn-delete-credential"
      variant="text"
      onClick={(e) => {
        handleDeleteUser();
      }}
      classes={classes.deleteBtn}
      startIcon={<DeleteIcon className={classes.menuIconRoot} />}
    >
      <span className={classes.btnText}>Delete</span>
    </Button>
  );
};

export default OptionPanel;
