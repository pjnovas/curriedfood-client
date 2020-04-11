import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import Theme from '../theme';

const Confirmation = ({
  visible,
  onDismiss,
  onConfirm,
  title,
  children,
  okText,
  loading
}) => (
  <Portal>
    <Dialog
      style={styles.layout}
      visible={visible}
      dismissable={!loading}
      onDismiss={onDismiss}
    >
      <Dialog.Title style={styles.title}>{title}</Dialog.Title>
      <Dialog.Content style={styles.content}>{children}</Dialog.Content>
      <Dialog.Actions>
        <Button disabled={loading} onPress={onDismiss}>
          Cancelar
        </Button>
        <Button
          dark
          mode="contained"
          style={styles.okButton}
          onPress={() => !loading && onConfirm()}
          loading={loading}
        >
          {okText}
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

const styles = StyleSheet.create({
  layout: {
    backgroundColor: Theme.colors.background
  },
  title: {
    color: Theme.colors.text,
    textAlign: 'center'
  },
  content: {
    // minHeight: 50
  },
  okButton: {
    marginHorizontal: 10
  }
});

export default Confirmation;
