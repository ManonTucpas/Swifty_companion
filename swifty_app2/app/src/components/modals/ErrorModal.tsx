import styles from '@/styles/styles';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ErrorModal = ({ visible, onClose, message }: { visible: boolean, onClose: () => void, message: string }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={stylesModal.modalContainer}>
        <View style={stylesModal.modalContent}>
          <Text style={styles.text}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.buttonPrimary}>
            <Text style={styles.buttonPrimaryText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const stylesModal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
 
});

export default ErrorModal;