import { useCallback, useEffect, useState } from "react";

type ModalHook = {
  modalIsVisible: boolean;
  toggleModal: () => void;
  openModal: () => void;
  closeModal: () => void;
};

export const useModal = (initialVisibility: boolean = false): ModalHook => {
  const [modalIsVisible, setModalIsVisible] =
    useState<boolean>(initialVisibility);

  const toggleModal = (): void => {
    setModalIsVisible((previousState) => !previousState);
  };

  const openModal = (): void => {
    setModalIsVisible(true);
  };

  const closeModal = (): void => {
    setModalIsVisible(false);
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  }, []);

  useEffect(() => {
    if (modalIsVisible) {
      document.addEventListener("keydown", handleKeyDown, false);
    } else {
      document.removeEventListener("keydown", handleKeyDown, false);
    }
  }, [modalIsVisible, handleKeyDown]);

  return {
    modalIsVisible,
    toggleModal,
    closeModal,
    openModal,
  };
};
