import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Modal from ".";

export default function PopUp({ children }: { children: React.ReactNode }) {
    const { modalOpen, setModalOpen } = useContext(AppContext);

    if (!modalOpen.open) {
        return null;
    }

    return (
        <Modal
            isOpen={modalOpen.open}
            onClose={() => setModalOpen({ ...modalOpen, open: false })}
        >
            {children}
        </Modal>
    );
}
