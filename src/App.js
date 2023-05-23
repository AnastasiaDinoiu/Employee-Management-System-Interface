import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/admin/Layout";
import HomePage from "./pages/HomePage";
import NoPage from "./pages/NoPage";
import LoginPage from "./pages/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardPage from "./pages/admin/DashboardPage";
import AddEmployeePage from "./pages/admin/AddEmployeePage";
import WorkDetailsPage from "./pages/admin/WorkDetailsPage";
import ManageLeavePage from "./pages/admin/ManageLeavePage";
import React from 'react';
import ViewEmployeePage from "./pages/admin/ViewEmployeePage";
import EmpDashboardPage from "./pages/user/EmpDashboardPage";
import ViewLeavePage from "./pages/user/ViewLeavePage";
import AddLeavePage from "./pages/user/AddLeavePage";
import EmpLayout from "./pages/EmpLayout";


export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path="/admin/dashboard" element={<DashboardPage/>}/>
                        <Route path="/admin/add-employee" element={<AddEmployeePage/>}/>
                        <Route path="/admin/view-employee" element={<ViewEmployeePage/>}/>
                        <Route path="/admin/work-details" element={<WorkDetailsPage/>}/>
                        <Route path="/admin/manage-leave" element={<ManageLeavePage/>}/>
                    </Route>
                    <Route path="/" element={<EmpLayout/>}>
                    <Route path="/dashboard" element={<EmpDashboardPage/>}/>
                        <Route path="/view-leave" element={<ViewLeavePage/>}/>
                        <Route path="/add-leave" element={<AddLeavePage/>}/>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}
