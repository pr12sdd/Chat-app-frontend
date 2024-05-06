import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Chat from "./components/chat.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <RouterProvider router={router} />
  //</React.StrictMode>
);
