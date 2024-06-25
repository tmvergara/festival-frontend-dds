import React, { useRef, useState } from "react";
import { Modal } from "../components/Modal.jsx";

export const useModal = ({
  children,
  modalBoxClassName,
  shouldAllowBackdropClick = true,
  onModalClose,
  onModalOpen,
}) => {
  const ref = useRef(null);
  const [resolver, setResolver] = useState(null);

  const closeModal = () => {
    if (onModalClose) {
      onModalClose();
    }
    if (ref.current) {
      ref.current.close();
    }
  };

  const openModal = () => {
    if (onModalOpen) {
      onModalOpen();
    }
    if (ref.current) {
      ref.current.showModal();
    }
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleAccept = () => {
    if (resolver) {
      resolver(true);
    }
    closeModal();
  };

  const handleCancel = () => {
    if (resolver) {
      resolver(false);
    }
    closeModal();
  };

  const modal = (
    <Modal
      onBackdropClick={() => {
        if (shouldAllowBackdropClick) {
          handleCancel();
        }
      }}
      ref={ref}
      modalBoxClassName={modalBoxClassName}
      onAccept={handleAccept}
      onCancel={handleCancel}
    >
      {children}
    </Modal>
  );

  return {
    closeModal,
    openModal,
    modal,
  };
};
