import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MyPlanner from "../components/Planner";
import UserPanel from "../components/User/UserPanel";
import Register from "../components/User/Register";
import NotFound from "../components/NotFound";
import Login from "../components/User/LoginPage";
import DashBoard from "../components/DashBoard";
import Header from "../components/global/Header";
import Admin from "../components/Admin/Admin";
import Cookies from "js-cookie";
import Cookie from "../components/global/Cookie";
import Footer from "../components/Footer/footer";

function App() {
  function RegisterRoute() {
    const isAuthenticated =
      Cookies.get("token") &&
      Cookies.get("id_user") &&
      Cookies.get("Username") &&
      Cookies.get("is_Admin");

    if (isAuthenticated) {
      return <Navigate to="/calendar" />;
    } else {
      return <Register />;
    }
  }

  function AuthPlanner() {
    const Auth =
      Cookies.get("token") &&
      Cookies.get("id_user") &&
      Cookies.get("Username") &&
      Cookies.get("is_Admin");

    if (Auth) {
      return <MyPlanner />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  function AdminRoute(props) {
    const isAdmin = Cookies.get("is_Admin");
    if (isAdmin === "true") {
      return <Admin {...props} />;
    } else {
      return <NotFound />;
    }
  }

  function EditUserInfo() {
    const Auth =
      Cookies.get("token") &&
      Cookies.get("id_user") &&
      Cookies.get("Username") &&
      Cookies.get("is_Admin");

    if (Auth) {
      return <UserPanel />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return (
    <Router>
      <Cookie />
      <Header />

      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/userpanel" element={<EditUserInfo />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/calendar" element={<AuthPlanner />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<RegisterRoute />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
