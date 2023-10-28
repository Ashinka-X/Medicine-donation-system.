import React, { useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button, FormControl } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import CustomDatePicker from "../../../components/CustomDatePicker";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";

import Items from "./items";
import Item from "./item";

import { formatDate } from "./helper.js";

import useCreateMedicine from "../../../hooks/services/useCreateMedicine";

// const columns = [
//   {
//     Header: "ID",
//     accessor: "id",
//   },
//   {
//     Header: "Medicine Name",
//     accessor: "medicineName",
//     headerStyles: { textAlign: "center" },
//     cellStyles: { textAlign: "center" },
//   },
//   {
//     Header: "Prescription",
//     accessor: "prescription",
//     headerStyles: { textAlign: "center" },
//     cellStyles: { textAlign: "center" },
//   },
//   {
//     Header: "Manufacture Date",
//     accessor: "manufactureDate",
//     headerStyles: { textAlign: "center" },
//     cellStyles: { textAlign: "center" },
//   },
//   {
//     Header: "Expiry Date",
//     accessor: "expiryDate",
//     headerStyles: { textAlign: "center" },
//     cellStyles: { textAlign: "center" },
//   },
//   {
//     Header: "Quantity",
//     accessor: "quantity",
//     headerStyles: { textAlign: "center" },
//     cellStyles: { textAlign: "center" },
//   },
// ];

const ManageMedicine = ({
  setOpenDeliveryNoteDialogBox,
  openDeliveryNoteDialogBox,
  itemColorsArray,
  itemNamesArray,
  id,
}) => {
  const classes = styles();
  const [medicine, setMedicine] = useState([]);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [manufactureDate, setManufactureDate] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: createMedicine } = useCreateMedicine();
  const formik = useFormik({
    initialValues: {
      medicineName: "",
      prescription: "",
      quantity: "",
    },

    onSubmit: async (values) => {
      try {
        const medicine = {
          expiryDate: formatDate(expiryDate),
          manufactureDate: formatDate(manufactureDate),
          donorId: id,
          ...values,
        };

        await createMedicine(medicine);
        setEnqueueSnackbar("Medicine Added Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar("Error Occured during medicin Submission", "error");
      }
    },
  });

  const closeDialog = () => {
    setOpenDeliveryNoteDialogBox(false);
  };

  const handleExpiryDateSelect = (date) => {
    setExpiryDate(date);
  };

  const handleManufactureDate = (date) => {
    setManufactureDate(date);
  };

  return (
    <>
      <DialogBox
        title={"Add Medicine"}
        open={openDeliveryNoteDialogBox}
        setOpen={closeDialog}
        maxWidth="lg"
        height="900px"
        children={
          <Grid
            container
            classes={{ container: classes.container }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <form onSubmit={formik.handleSubmit}>
                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <FormControl fullWidth>
                        <LabelledEditableSelect
                          id="medicineName"
                          name="medicineName"
                          label="Medicine Name"
                          placeholder="Enter Medicine Name"
                          onChange={(value) =>
                            formik.setFieldValue("medicineName", value)
                          }
                          value={formik.values.medicineName}
                          // items={requestNumbersArray}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <FormControl fullWidth>
                        <LabelledEditableSelect
                          id="prescription"
                          name="prescription"
                          label="Prescription"
                          placeholder="Enter Prescription"
                          onChange={(value) =>
                            formik.setFieldValue("prescription", value)
                          }
                          value={formik.values.prescription}
                          // items={requestNumbersArray}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container className={classes.section} spacing={3}>
                  <Grid xs={12} item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <Grid className={classes.label}>
                          SELECT MANUFACTURE DATE
                        </Grid>
                        <CustomDatePicker
                          handleDateSelect={handleManufactureDate}
                          date={manufactureDate}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container className={classes.section} spacing={3}>
                  <Grid xs={12} item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <Grid className={classes.label}>
                          SELECT EXPIRY DATE
                        </Grid>
                        <CustomDatePicker
                          handleDateSelect={handleExpiryDateSelect}
                          date={expiryDate}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <FormControl fullWidth>
                        <LabelledEditableSelect
                          id="quantity"
                          name="quantity"
                          label="Quantity"
                          placeholder="Enter Quantity"
                          onChange={(value) =>
                            formik.setFieldValue("quantity", value)
                          }
                          value={formik.values.quantity}
                          // items={requestNumbersArray}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                {/* {medicine && (
                  <Grid item className={classes.listTable} xs={12}>
                    <LazyLoadingTable
                      columns={columns}
                      data={medicine}
                      hiddenColumns={["id"]}
                      maxHeightInRows={15}
                      onClickTableRow={(index, row) => {
                        console.log(index, row);
                      }}
                      customProps={{ height: 390 }}
                    />
                  </Grid>
                )} */}
                <Grid item container className={classes.block}>
                  <Button
                    id="btn-general-info-next"
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    disbaled={formik.isSubmitting}
                  >
                    Save
                  </Button>
                </Grid>
              </form>
            </Grid>
            {/* <Item
              formik={formik}
              openItem={openItem}
              setOpenItem={setOpenItem}
              classes={classes}
              handleSaveItem={handleSaveItem}
              itemColorsArray={itemColorsArray}
              item={item}
            />
            <Items
              formik={formik}
              classes={classes}
              itemNamesArray={itemNamesArray}
              setOpenItems={setOpenItems}
              openItems={openItems}
              handleSaveItems={handleSaveItems}
            /> */}
          </Grid>
        }
      />
    </>
  );
};
export default ManageMedicine;
