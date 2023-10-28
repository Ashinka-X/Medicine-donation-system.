import React, { useState, useRef, useEffect } from "react";

import { Grid, Button } from "@mui/material";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";

import PageLayout from "../../../components/PageLayout";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import ManageEmployee from "../manage-user";

import OptionPanel from "../option-panel";

import { styles } from "./styles";

import useGetUsers from "../../../hooks/services/useGetUsers";

import UserRegistration from "../../Registration/User";

const ListUser = () => {
  const classes = styles();

  const [openCreateRepair, setOpenCreateRepair] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const { data: useData } = useGetUsers();

  const handleCreateRepair = () => {
    setOpenCreateRepair(true);
  };

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "User Name",
      accessor: "name",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Email",
      accessor: "email",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Gender",
      accessor: "gender",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "NIC",
      accessor: "nationalIdentityNumber",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Location",
      accessor: "location",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Age",
      accessor: "age",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Phone No",
      accessor: "phoneNumber",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return <OptionPanel values={values} setEnabled={setEnabled} />;
      },
    },
  ];

  return (
    <Grid item container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Users"}
        pageActions={
          <Grid>
            <Button
              id="btn-create-employee"
              variant="contained"
              onClick={handleCreateRepair}
            >
              <NoteAddTwoToneIcon className={classes.plusIcon} />
              {"Register User"}
            </Button>
          </Grid>
        }
      >
        <Grid item className={classes.section} xs={12}>
          {useData && (
            <LazyLoadingTable
              columns={columns}
              data={useData}
              hiddenColumns={["id"]}
              maxHeightInRows={10}
              onClickTableRow={(index, row) => {
                console.log(index, row);
              }}
              customProps={{ height: "1200px" }}
            />
          )}
        </Grid>
      </PageLayout>
      <UserRegistration
        setOpenRegisterTeacher={setOpenCreateRepair}
        openRegisterTeacher={openCreateRepair}
      />
    </Grid>
  );
};
export default ListUser;
