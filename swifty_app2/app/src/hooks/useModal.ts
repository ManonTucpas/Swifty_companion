import { useState } from 'react';

export const useModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const showModal = (message: string) => {
        setModalMessage(message);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalMessage('');
        setModalVisible(false);
    };

    return {
        modalVisible,
        modalMessage,
        showModal,
        hideModal
    };
}
