import { Route, Routes } from "react-router-dom";

import Home from '../App';
import About from "../About";
import Service from "../Service";
import Dashboard from "../Dashboard/Dashboard";
import Register from "../auth/register";
import ProtectedRoute from "./ProtectedRoute";

function AppRoute() {
    return (
        <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Home></Home>}/>
            <Route path="/About" element={<About></About>}/>
            <Route path="/Service" element={<Service></Service>}/>

            <Route path="/register" element={<Register></Register>}/>
            <Route element={<ProtectedRoute>
                <Route path="/dashboard" element={<Dashboard />} />
                </ProtectedRoute>}>
            </Route>
        </Routes>
    )
}

export default AppRoute;