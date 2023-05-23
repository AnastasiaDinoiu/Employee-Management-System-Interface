import {Button, Form, FormLabel, Modal} from "react-bootstrap";
import logo from '../images/login-image.jpg';
import "./admin/style.css"
import axiosClient from "../utils/axiosInstance";
import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import {RiLockPasswordFill, RiMailLine} from 'react-icons/ri'
import {BsEye, BsEyeSlash} from 'react-icons/bs'
import axiosInstance from "../utils/axiosInstance";


export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState("password");
    const [isAdmin, setIsAdmin] = useState(false);

    const [showError, setShowError] = useState(null);
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const getId = async (e) => {
        try {
            let data
            if (isAdmin) {
                data = await axiosInstance().get(`admin/session/${email}`)
            } else {
                data = await axiosInstance().get(`employee/session/${email}`)
            }
            if (data) {
                sessionStorage.setItem('_id', data.data._doc._id)
            } else {
                setError(`Session with ${email} email not found!`)
                setShowError(true);
            }
        } catch (err) {
            setError('Server error')
            setShowError(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axiosClient().post('/employee/login', {
                email: email,
                password: password
            })
            if (!data.status) {
                setIsAdmin(false)
                await getId()
                sessionStorage.setItem('sessionToken', data)
                navigate("/dashboard")
            } else {
                const {data} = await axiosClient().post('/admin/login', {
                    email: email,
                    password: password
                })
                if (!data.status) {
                    setIsAdmin(true)
                    await getId()
                    sessionStorage.setItem('sessionToken', data)
                    navigate("/admin/dashboard")
                } else {
                    setError('Invalid username or password')
                    setShowError(true);
                }
            }
        } catch (e) {
            console.log(e)
            setError('Database error')
            setShowError(true);
        }
    }

    return (
        <>
            <Modal className="errorModal" show={showError} onHide={() => setShowError(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
            </Modal>

            <div className="loginContainer">
                <div className="smallLoginContainer">
                    <div className="login-div-form">
                        <h2 style={{textAlign: "center"}}>
                            Login
                        </h2>
                        <Form className="login-form" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <FormLabel>Email address</FormLabel>
                                <div className="input-group">
                                    <div className="input-group-append">
                                        <span className="input-group-text icon">
                                          <RiMailLine/>
                                        </span>
                                    </div>
                                    <Form.Control
                                        type="email"
                                        placeholder="Type your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <div className="input-group">
                                    <div className="input-group-append">
                                    <span className="input-group-text icon">
                                      <RiLockPasswordFill/>
                                    </span>
                                    </div>
                                    <Form.Control
                                        type={passwordType}
                                        placeholder="Type your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                    />
                                    <div className="input-group-btn">
                                        <span className="btn btn-outline-primary eyeIcon" onClick={togglePassword}>
                                            {passwordType === "password" ? <BsEyeSlash/> : <BsEye/>}
                                        </span>
                                    </div>
                                </div>
                            </Form.Group>
                            <br/>
                            <Button className="login-button login-button-dimensions" variant="primary" type="submit">
                                LOGIN
                            </Button>
                        </Form>
                    </div>
                    <div className="login-wallpaper">
                        <img src={logo} alt="Wallpaper" className="login-img"/>
                    </div>
                </div>
            </div>
        </>
    )
}
