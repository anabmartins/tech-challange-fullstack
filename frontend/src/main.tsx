import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Manage from "./screens/Manage";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/manage", element: <Manage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}> 
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
