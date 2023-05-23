import React, {useEffect, useState} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import axiosInstance from "../../utils/axiosInstance";
import '@emotion/react';
import {Button, Container, Modal, Table} from "react-bootstrap";

export default function ManageLeaveTable() {
    const [pendingLeaves, setPendingLeaves] = useState([])

    const [showMessage, setShowMessage] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        (async function getPendingLeaves() {
                try {
                    const {data} = await axiosInstance().get('/pending-leave/unapproved');
                    if (data) {
                        setPendingLeaves(data)
                        console.log(data)
                    }
                } catch (err) {
                    console.error(err);
                    return [];
                }
            }
        )()
    }, [])

    const handleApprove = async (_id) => {
        try {
            const {status} = await axiosInstance().put(`pending-leave/update/${_id}`, {
                status: true
            })
            if (status === 200) {
                setPendingLeaves(pendingLeaves.filter(pendingLeave => pendingLeave._id !== _id))
                setMessage(`Pending leave with ${_id} id successfully approved!`)
                setShowMessage(true);
            } else {
                setError(`Pending leave with ${_id} id not found!`)
                setShowError(true);
            }
        } catch (err) {
            setError('Server error')
            setShowError(true);
        }
    };

    const handleDecline = async (_id) => {
        try {
            const {status} = await axiosInstance().delete(`pending-leave/delete/${_id}`)
            if (status === 200) {
                setPendingLeaves(pendingLeaves.filter(pendingLeave => pendingLeave._id !== _id))
                setMessage(`Pending leave with ${_id} id declined!`)
                setShowMessage(true);
            } else {
                setError(`Pending leave with ${_id} id not found!`)
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

            <Container style={{paddingTop: '20px'}}>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Start Date</th>
                        <th>nthDays</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendingLeaves.map((pendingLeave, i) => {
                        return (
                            <tr key={pendingLeave._id}>
                                <td>{i + 1}</td>
                                <td>{pendingLeave.employeeName}</td>
                                <td>{pendingLeave.employeeEmail}</td>
                                <td>{new Date(pendingLeave.startDate).toDateString()}</td>
                                <td>{pendingLeave.nthDays}</td>
                                <td style={{width: '30px'}}>
                                    <Button className="btn approve-button"
                                            onClick={() => handleApprove(pendingLeave._id)}>
                                        Approve
                                    </Button>
                                </td>
                                <td style={{width: '30px'}}>
                                    <Button className="btn btn-danger" onClick={() => handleDecline(pendingLeave._id)}>
                                        Decline
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

