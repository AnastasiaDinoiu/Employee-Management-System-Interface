import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from 'react';
import EmpSideBar from "../../components/user/EmpSidebar";
import SideBar from "../../components/admin/Sidebar";


export default function EmpLayout() {
    const token = sessionStorage.getItem('sessionToken')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])

    return (
        <>
            <div className="mainContainer">
                <EmpSideBar/>
                <Outlet/>
            </div>
        </>
    )
}