import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
    display: auto;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalInner = styled.div`
    min-width: 500px;
    position: relative;
    background: white;
    padding: 3em
`;

const Modal = ({
    onClose,
    children
}: ModalProps) => {
    return (
        <ModalWrapper
            onClick={onClose}
        >
            <ModalInner
                onClick={e => e.stopPropagation()}
            >
                {children}
            </ModalInner>
        </ModalWrapper>
    )
};

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export default Modal;
