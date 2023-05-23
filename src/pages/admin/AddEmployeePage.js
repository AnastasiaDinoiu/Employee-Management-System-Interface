import React, {useState} from "react";
import axiosInstance from "../../utils/axiosInstance";
import EmployeeForm from "../../components/admin/EmployeeForm";

export default function AddEmployeePage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [birthDate, setBirthDate] = useState(0)
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [department, setDepartment] = useState('')

    const [showMessage, setShowMessage] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axiosInstance().post(`/employee`, {
                name: name,
                email: email,
                password: password,
                birthDate: new Date(birthDate).getTime(),
                phoneNumber: phoneNumber,
                department: department,
                address: address,
                daysOff: 10
            })
            if (response.status === 200) {
                setName('')
                setEmail('')
                setPassword('')
                setBirthDate('')
                setPhoneNumber('')
                setDepartment('')
                setAddress('')
                setMessage('Employee successfully added')
                setShowMessage(true);
            } else {
                setError('Database error')
                setShowError(true);
            }
        } catch (err) {
            setError('Database error')
            setShowError(true);
        }
    }

    return (
        <>
            <EmployeeForm
                method="post"
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                department={department}
                setDepartment={setDepartment}
                address={address}
                setAddress={setAddress}
                showMessage={showMessage}
                setShowMessage={setShowMessage}
                showError={showError}
                setShowError={setShowError}
                message={message}
                error={error}
                handleSubmit={handleSubmit}
            />
        </>
    )
}