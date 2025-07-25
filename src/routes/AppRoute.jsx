import { Route, Routes } from "react-router-dom";

import Home from "../App";
import About from "../About";
import Service from "../Service";
import Dashboard from "../Dashboard/Dashboard";
import Register from "../auth/register";
import ProtectedRoute from "./ProtectedRoute";
import Settings from "../Dashboard/Settings";
import TodoListDetail from "../Dashboard/TodoListDetail";

function AppRoute() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />

      {/* Protected Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todo-list-detail/:id" element={<TodoListDetail />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;
