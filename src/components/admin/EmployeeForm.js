import React, {useEffect, useState} from 'react';
import {Button, Container, Dropdown, DropdownButton, Form, Modal} from "react-bootstrap";
import {BsEye, BsEyeSlash} from "react-icons/bs";
import {FormGroup} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

export default function EmployeeForm(props) {
    const {
        method,
        name,
        setName,
        email,
        password,
        setPassword,
        setEmail,
        birthDate,
        setBirthDate,
        phoneNumber,
        setPhoneNumber,
        department,
        setDepartment,
        address,
        setAddress,
        showMessage,
        setShowMessage,
        showError,
        setShowError,
        message,
        error,
        handleSubmit
    } = props

    const [passwordType, setPasswordType] = useState("password");
    const [departments, setDepartments] = useState([])

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    useEffect(() => {
        (async function getDepartments() {
            try {
                const {data} = await axiosInstance().get('departments')
                setDepartments(data)
                // console.log(department)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    return (
        <div className="emp-form-container">
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

            <Container style={{paddingTop: '50px'}}>
                {
                    method === "post" ? <div style={{fontSize: 30, marginBottom: 20}}>Add new employee</div> :
                        <div style={{fontSize: 30, marginBottom: 20}}>Update employee</div>
                }
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3" controlid="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Jane Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3" controlid="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="example@domain.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    {
                        method === "post" ?
                            <Form.Group className="mb-3" controlid="password">
                                <Form.Label>Password</Form.Label>
                                <div className="input-group">
                                    <Form.Control
                                        required
                                        type={passwordType}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="input-group-btn">
                            <span className="btn btn-outline-primary eyeIcon" onClick={togglePassword}>
                                {passwordType === "password" ? <BsEyeSlash/> : <BsEye/>}
                            </span>
                                    </div>
                                </div>
                            </Form.Group>
                            : ""
                    }
                    <Form.Group className="mb-3" controlid="birthDate">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlid="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="1357 Blane Street, .."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlid="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="+04 070 000 000"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlid="department">
                        <Form.Label>Department</Form.Label>
                        <DropdownButton id="dropdown-gen" title={department}>
                            {departments.map(dep => (
                                <Dropdown.Item key={dep._id}
                                               onClick={() => {
                                                   setDepartment(dep.name)
                                               }}>
                                    {dep.name}
                                </Dropdown.Item>
                            ))
                            }
                        </DropdownButton>
                    </Form.Group>
                    {
                        method === "put" ?
                            <Button className="btn login-button login-button-dimensions" style={{marginTop: "30px"}} type="submit">
                                Submit
                            </Button>
                            :
                            <Button className="btn login-button login-button-dimensions" style={{marginTop: "30px", height: "45px"}} type="submit">
                                Submit
                            </Button>

                    }
                </Form>
            </Container>
        </div>
    )
}