import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, 
RouterProvider } from "react-router-dom";
import Manage from "./screens/Manage";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/manage", element: <Manage /> }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
