import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import 'react-transition-group';
import "./EmpSidebar.css";
import {VscThreeBars} from "react-icons/vsc";
import {HiSquares2X2} from "react-icons/hi2";
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import {FaCalendarAlt} from "react-icons/fa";


export default function EmpSideBar() {
    const location = useLocation();
    const token = sessionStorage.getItem('sessionToken')
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState('');

    const isActive = (path) => {
        return location.pathname === path ? 'active-item' : '';
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSubMenu = (isOpen) => {
        setIsSubMenuOpen(isOpen);
    };

    const handleSubMenuIcon = () => {
        if (isSubMenuOpen) {
            return <BsChevronUp className="show-span text-item submenu-icon"/>
        }
        return <BsChevronDown className="show-span text-item submenu-icon"/>
    }

    const handleSignOut = () => {
        if (token) {
            sessionStorage.removeItem('sessionToken')
            sessionStorage.removeItem('id')
        }
    }

    return (
        <div className={`${isSidebarOpen ? "main-sidebar open-sidebar" : "closed-main-sidebar"}`}>
            <div className="sidebar-header">
                <div className="sidebar-header-name">
                    {isSidebarOpen && <span className="show-span">Clanul iepurasilor</span>}
                    <div className={`${isSidebarOpen ? "sidebar-header-icon" : "closed-sidebar-header-icon"}`}>
                        <button className="sidebar-toggle" onClick={toggleSidebar}>
                            <VscThreeBars size={21}/>
                        </button>
                    </div>
                </div>
            </div>

            <ul className={"sidebar-menu"}>
                <Link to="/dashboard" className="text-item">
                    <li className={`sidebar-menu-item ${isActive('/dashboard')}`}
                        onClick={() => handleSubMenu(false)}>
                        <HiSquares2X2 className="sidebar-menu-icon"/>
                        {isSidebarOpen && <span className="show-span">Dashboard</span>}
                    </li>
                </Link>
                <li className={`text-item sidebar-menu-item ${isActive('/add-leave')} ${isActive('/view-leave')}`}
                    onClick={() => handleSubMenu(!isSubMenuOpen)}>
                    <FaCalendarAlt className="sidebar-menu-icon"/>
                    {isSidebarOpen && <span className="show-span">Manage Leave</span>}
                    {isSidebarOpen && handleSubMenuIcon()}
                </li>
                {isSubMenuOpen && (
                    <ul className="sub-menu">
                        <Link to="/add-leave" className="text-item">
                            {isSidebarOpen && <li className="sub-menu-item show-span">Add Leave</li>}
                        </Link>
                        <Link to="/view-leave" className="text-item">
                            {isSidebarOpen && <li className="sub-menu-item show-span">View Leave</li>}
                        </Link>
                    </ul>
                )}
            </ul>

            <Link to={"/login"}>
                <div className="sidebar-footer text-item show-span" onClick={handleSignOut()}>
                    Sign out
                </div>
            </Link>
        </div>
    );
};
