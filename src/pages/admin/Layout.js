import {Outlet, useNavigate} from "react-router-dom";
import React, {useEffect} from 'react';
import SideBar from "../../components/admin/Sidebar";


export default function Layout() {
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
                <SideBar/>
                <Outlet/>
            </div>
        </>
    )
}