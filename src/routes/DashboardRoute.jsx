import { Route, Routes } from "react-router-dom";

import Dashboard from '../routes';

function Dashboards() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard></Dashboard>}/>
        </Routes>
    )
}

export default Dashboards;