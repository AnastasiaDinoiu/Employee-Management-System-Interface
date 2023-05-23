import React from 'react'
import {Container} from "react-bootstrap";
import '@emotion/react';
import {Backdrop, Box, Fade, Modal} from "@mui/material";
import {getEmployees} from "./EmployeeTable";
import UpdateEmployee from "../../pages/admin/UpdateEmployee";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 7,
};

export default function UpdateModal(props) {
    const {id, setEmployees, open, setOpen} = props

    const handleClose = async () => {
        let data = await getEmployees()
        setEmployees(data)
        setOpen(false)
    }

    return (
        <div className="transition-modal">
            <Modal
                className="update-modal"
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
                style={{zIndex: 1000}}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Container>
                            <UpdateEmployee id={id}/>
                        </Container>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}