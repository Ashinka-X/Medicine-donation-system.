import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../components/AppContext.js";

import { Grid, Button } from "@mui/material";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";

import PageLayout from "../../../components/PageLayout";
import LazyLoadingTable from "../../../components/LazyLoadingTable";


import OptionPanel from "../option-panel";

import { styles } from "./styles";

import useGetOrdersList from "../../../hooks/services/useGetOrdersList";

import { ROLE } from "../../../constants.js";

const ListOrders = () => {
  const classes = styles();
  const navigate = useNavigate();

  const [openCreateEmployee, setOpenCreateEmployee] = useState(false);
  const [refetch, setReftch] = useState(false);

  const handleCreateEmployee = () => {
    setOpenCreateEmployee(true);
  };

  const { role, id } = useContext(AppContext);

  const { data: ordersData } = useGetOrdersList({
    id: id,
    role: role,
    refetch: refetch,
  });

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Med Name",
      accessor: "medicineName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Patient Name",
      accessor: "patientName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Importance",
      accessor: "medicinePrescription",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "ExpiryDate",
      accessor: "expiryDate",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "PharmacyName",
      accessor: "pharmacyName",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "P Location",
      accessor: "pharmacyLocation",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Delivered",
      accessor: "deliverd",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      Cell: ({ value }) => <>{value?.toLocaleString()}</>,
    },
  ];
  if (role === ROLE.PHARMACY) {
    columns.splice(7, 0, {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return (
          <OptionPanel
            values={values}
            setReftch={setReftch}
            refetch={refetch}
          />
        );
      },
    });
  }

  return (
    <Grid item container classes={{ container: classes.gridContainer }}>
      <PageLayout pageHeading={"User Order Details"}>
        <Grid item className={classes.section} xs={12}>
          {ordersData && (
            <LazyLoadingTable
              columns={columns}
              data={ordersData}
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
      
    </Grid>
  );
};
export default ListOrders;
