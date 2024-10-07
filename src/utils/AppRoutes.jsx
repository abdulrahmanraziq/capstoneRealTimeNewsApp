import { Navigate } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Forgotpassword from "../components/Forgotpassword";
import Resetpassword from "../components/Resetpassword";
import AddNews from "../components/AddNews";
import BreakingNews from "../components/BreakingNews";
import TopBar from "../components/TopBar";
import Politics from "../components/Politics";
import Business from "../components/Business";
import Sports from "../components/Sports";
import Entertainment from "../components/Entertainment";
import Education from "../components/Education";
import GetTopicsById from "../components/GetTopicsById";
import ProtectedRoutes from "./ProtectedRoutes";
import AdminRoutes from "./AdminRoutes";
import Subscription from "../components/Subscription";
import Dashboard from "../components/Dashboard";
const AppRoutes = [
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <Forgotpassword />,
  },
  {
    path: "/reset-password",
    element: <Resetpassword />,
  },
  {
    path: "/breaking-news",
    element: (
      <>
        <ProtectedRoutes>
          <TopBar />
          <BreakingNews />
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "/politics",
    element: (
      <>
        <ProtectedRoutes>
          <TopBar />
          <Politics />
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "/business",
    element: (
      <>
        <ProtectedRoutes>
          <TopBar />
          <Business />
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "/sports",
    element: (
      <>
        <ProtectedRoutes>
          <TopBar />
          <Sports />
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "/entertainment",
    element: (
      <>
        <ProtectedRoutes>
          <TopBar />
          <Entertainment />
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "/education",
    element: (
      <>
        <ProtectedRoutes>
          <TopBar />
          <Education />
        </ProtectedRoutes>
      </>
    ),
  },

  {
    path: "/:topic/:id",
    element: (
      <>
          <TopBar />
          <GetTopicsById />
      </>
    ),
  },
  {
    path: "/addNews",
    element: (
      <>
        <ProtectedRoutes>
          <AdminRoutes>
            <TopBar />
            <AddNews />
          </AdminRoutes>
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <ProtectedRoutes>
          <TopBar />
          <Dashboard />
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "/subscribe",
    element: (
      <>
        <ProtectedRoutes>
          <TopBar />
          <Subscription />
        </ProtectedRoutes>
      </>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

export default AppRoutes;
