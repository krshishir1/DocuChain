import React from "react";

import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connection";
import RegisterDocument from "./pages/RegisterDocument";

import RegisterInstitute from "./pages/RegisterInstitute";

import AppLayout from "./layout/AppLayout";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const App = function () {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="connect" element={<Connect />} />
          <Route path="register" element={<RegisterDocument />} />
        </Route>
        <Route path="/institute" element={<AppLayout />}>
          <Route index element={<RegisterInstitute />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
