import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import NavigationBar from "../NavigationBar";
import ListPharmacy from "../../pages/Pharmacy/ListPharmacy";
import Login from "../../pages/Login";
import ListUser from "../../pages/User/list-user";
import ListMedicine from "../../pages/Medicine/ListMedicine";
import ListOrders from "../../pages/Orders/list-orders";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />} />

        <Route path="/" element={<NavigationBar />}>
          <Route path="orders" element={<ListOrders />} />
          <Route path="pharmacy" element={<ListPharmacy />} />
          <Route path="medicine" element={<ListMedicine />} />
          <Route path="user" element={<ListUser />} />
        </Route>
      </Route>
    )
  );
  return { router };
};

export { AppRouter };
