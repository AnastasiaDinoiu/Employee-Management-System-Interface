import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import axiosInstance from "../../utils/axiosInstance";
import '@emotion/react';
import {Button, Container, Modal, Table} from "react-bootstrap";
import UpdateModal from "./UpdateModal";


export async function getEmployees() {
    try {
        const {data} = await axiosInstance().get('/employees');
        return data
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default function EmployeeTable() {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const [employees, setEmployees] = useState([])
    const [showModal, setShowModal] = useState(false)

    const [showMessage, setShowMessage] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        (async function fetchEmployees() {
            const employeesData = await getEmployees()
            setEmployees(employeesData)
        })()
    }, [])

    const handleUpdate = (_id) => {
        setId(_id)
        setShowModal(true)
        setOpen(true)
    };

    const handleDelete = async (_id) => {
        console.log(_id)
        try {
            const {status} = await axiosInstance().delete(`employee/${_id}`)
            if (status === 200) {
                setEmployees(employees.filter(employee => employee._id !== _id))
                setMessage(`Employee with ${_id} id was successfully removed!`)
                setShowMessage(true);
            } else {
                setError(`Employee with ${_id} id not found!`)
                setShowError(true);
            }
        } catch (err) {
            setError('Server error')
            setShowError(true);
        }
    };

    return (
        <>
            <Modal className="messageModal" show={showMessage} onHide={() => setShowMessage(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
            </Modal>

            <Modal className="errorModal" show={showError} onHide={() => setShowError(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
            </Modal>

            {showModal ? <UpdateModal id={id} setEmployees={setEmployees} open={open} setOpen={setOpen}/> : ""}

            <Container style={{paddingTop: '20px'}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Birth Date</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Department</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        employees.map((employee, i) => (
                            <tr key={employee._id}>
                                <td>{i + 1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{new Date(employee.birthDate).toDateString()}</td>
                                <td>{employee.address}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.department}</td>
                                <td style={{width: "30px"}}><Button className="btn login-button"
                                                                    onClick={() => handleUpdate(employee._id)}>Update</Button>
                                </td>
                                <td style={{width: "30px"}}><Button className="btn btn-danger"
                                                                    onClick={() => handleDelete(employee._id)}>Delete</Button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

