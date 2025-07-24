// AppRoute.jsx
import { Route, Routes } from "react-router-dom";

import Home from "../App";
import About from "../About";
import Service from "../Service";
import Dashboard from "../Dashboard/Dashboard";
import Register from "../auth/register";
import ProtectedRoute from "./ProtectedRoute";

function AppRoute() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Service" element={<Service />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoute;
