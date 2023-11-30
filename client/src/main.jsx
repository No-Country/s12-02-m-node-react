import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/pages/Layout";
import Home from "./components/pages/Home";

import "./index.css";
import Detail from "./components/pages/EventDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/detail",
        element: <Detail />,
      },
      {
        path: "*",
        element: <h2>Ya casi hacemos esa pagina, paciencia 🤓</h2>,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
