import React from "react";

import Dashboard from "./pages/Dashboard";
import Connect from "./pages/Connection";

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
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
