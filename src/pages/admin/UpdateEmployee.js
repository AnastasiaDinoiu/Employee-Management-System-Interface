import React, {useEffect, useState} from "react";
import axiosInstance from "../../utils/axiosInstance";
import EmployeeForm from "../../components/admin/EmployeeForm";

export default function UpdateEmployee(props) {
    const {id} = props
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birthDate, setBirthDate] = useState('1990-01-01')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [department, setDepartment] = useState('')

    const [showMessage, setShowMessage] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        (async function getEmployee() {
            try {
                const {data} = await axiosInstance().get(`/employee/${id}`)
                if (data) {
                    setName(data.name)
                    setEmail(data.email)
                    setBirthDate((new Date(data.birthDate)).toISOString().split("T")[0])
                    setPhoneNumber(data.phoneNumber)
                    setAddress(data.address)
                    setDepartment(data.department)
                }
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            console.log(new Date(birthDate).getTime())
            const response = await axiosInstance().put(`/employee/${id}`, {
                name: name,
                email: email,
                // birthDate: new Date(birthDate).toISOString().split("T")[0],
                birthDate: new Date(birthDate).getTime(),
                phoneNumber: phoneNumber,
                department: department,
                address: address
            })
            if (response.status === 200) {
                setName('')
                setEmail('')
                setBirthDate('')
                setPhoneNumber('')
                setDepartment('')
                setAddress('')
                setMessage('Employee successfully updated')
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
                method="put"
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
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