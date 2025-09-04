import { Modal, ModalContent, ModalHeader } from "@heroui/react";

interface IDialogFormProps {
    title?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
    openDialog?: boolean;
    handleDialogClose?: () => void;
    bodyContent?: React.ReactNode;
}

const DialogForm: React.FC<IDialogFormProps> = ({
    title,
    size,
    openDialog,
    handleDialogClose,
    bodyContent
}) => {
    return (
        <Modal
            className='overflow-y-visible !mt-[250px]'
            backdrop="blur"
            size={size} 
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
                {title && (<ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>)}
                {bodyContent}
            </ModalContent>
        </Modal>
    )
}

export default DialogForm
