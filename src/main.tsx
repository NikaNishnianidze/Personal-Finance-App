import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Layout from "./Layout/Layout";
import Login from "./pages/Login";
import UserProvider from "./context/UserProvider";
import Home from "./pages/Home";
import NavigationLayout from "./Layout/NavigationLayout";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Pots from "./pages/Pots";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/home",
    element: <NavigationLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/transactions",
        element: <Transactions />,
      },
      {
        path: "/home/budget",
        element: <Budgets />,
      },
      {
        path: "/home/pots",
        element: <Pots />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
