import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
