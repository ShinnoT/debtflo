import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useGlobalError } from "@/context/error";

const ErrorModal = ({ title, children }) => {
    const { setGlobalError } = useGlobalError();
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () =>
        setIsOpen(false) || setGlobalError({ title: null, message: null });

    useEffect(() => {
        if (title) setIsOpen(true);
    }, [title]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ErrorModal;
