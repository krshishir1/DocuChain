import React from "react";

import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connection";
import RegisterDocument from "./pages/RegisterDocument";
import PageNotFound from "./pages/PageNotFound";

import RegisterInstitute from "./pages/RegisterInstitute";

import AppLayout from "./layout/AppLayout";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddress } from "./store/accountSlice";
import { useAccount } from "wagmi";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const App = function () {
  const { address } = useAccount();
  const dispatch = useDispatch();

  useEffect(() => {
    const accountType = localStorage.getItem("accountType") as string;

    if(address && accountType) {
      console.log("running and changing address")
      dispatch(setAddress({address, type: accountType}))
    }
  }, [])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Connect />} />
          <Route path="connect" element={<Connect />} />
        </Route>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="register" element={<RegisterDocument />} />
          <Route path="institute" element={<RegisterInstitute />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
