import {BsArrowDownLeftCircle, BsClock, BsPersonCircle} from "react-icons/bs";
import React, {useEffect, useState} from 'react';
import {getEmployees} from "../../components/admin/EmployeeTable";
import axiosInstance from "../../utils/axiosInstance";


async function getPendingLeaves() {
    try {
        const {data} = await axiosInstance().get('/pending-leave/unapproved');
        return data
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default function DashboardPage() {
    const [employees, setEmployees] = useState([])
    const [pendingLeaves, setPendingLeaves] = useState([])

    useEffect(() => {
        (async function fetchEmployees() {
            const employeesData = await getEmployees()
            setEmployees(employeesData)
        })()
    }, [])

    useEffect(() => {
        (async function fetchPendingLeaves() {
            const pendingData = await getPendingLeaves()
            setPendingLeaves(pendingData)
        })()
    }, [])

    return (
        <>
            <div className="dashContent">
                <div className="ag-format-container">
                    <div className="ag-courses_box">
                        <div className="ag-courses_item">
                            <a href="/admin/view-employee" className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>

                                <div className="ag-courses-item_title">
                                    <div className="cardIcon">
                                        <BsPersonCircle size={50}/>
                                    </div>
                                    Total Employees
                                </div>

                                <div className="ag-courses-item_date-box">
                                    <span className="ag-courses-item_date">
                                        {employees.length}
                                    </span>
                                </div>
                            </a>
                        </div>

                        <div className="ag-courses_item">
                            <a href="/admin/work-details" className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>

                                <div className="ag-courses-item_title">
                                    <div className="cardIcon">
                                        <BsClock size={50}/>
                                    </div>
                                    Work Details
                                </div>

                                <div className="ag-courses-item_date-box">
                                    <span className="ag-courses-item_date">
                                        numar
                                    </span>
                                </div>
                            </a>
                        </div>

                        <div className="ag-courses_item">
                            <a href="/admin/manage-leave" className="ag-courses-item_link">
                                <div className="ag-courses-item_bg"></div>

                                <div className="ag-courses-item_title">
                                    <div className="cardIcon">
                                        <BsArrowDownLeftCircle size={50}/>
                                    </div>
                                    Pending Leave
                                </div>

                                <div className="ag-courses-item_date-box">
                                    <span className="ag-courses-item_date">
                                        {pendingLeaves.length}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}