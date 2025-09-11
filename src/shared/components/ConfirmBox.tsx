import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";

interface ConfirmBoxProps {
    title: string;
    message?: string;
    openDialog?: boolean;
    handleSuccess?: () => void;
    handleDialogClose?: () => void;
    // getAllArea?: () => void;
}

const ConfirmBox: React.FC<ConfirmBoxProps> = ({ title, message, openDialog, handleSuccess, handleDialogClose }) => {
    return (
        <Modal
            backdrop="blur"
            isOpen={openDialog}
            onClose={handleDialogClose}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: "easeIn",
                        },
                    },
                }
            }}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                    <p>{message}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant='solid' onClick={handleSuccess} className='text-black'>
                        Confirm
                    </Button>
                    <Button color="danger" variant="solid" onClick={handleDialogClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConfirmBox
