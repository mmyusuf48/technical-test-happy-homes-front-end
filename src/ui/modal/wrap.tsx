import { Modal } from '@mui/material'
import React from 'react'

interface Props {
    children: React.ReactElement,
    open: boolean,
    handleOpen: (value: boolean) => void
}

const ModalWrapUi = ({ children, open, handleOpen }: Props) => {
    return (
        <Modal
            open={open}
            onClose={() => handleOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {children}
        </Modal>
    )
}

export default ModalWrapUi
