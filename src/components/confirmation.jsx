import React from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Provider, Dialog, Button } from 'react-native-paper';
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
  <Provider>
    <Portal>
      <Portal>
        <Dialog
          style={styles.layout}
          visible={visible}
          dismissable={!loading}
          onDismiss={onDismiss}
        >
          <Dialog.Title style={styles.contentText}>{title}</Dialog.Title>
          <Dialog.Content>{children}</Dialog.Content>
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
    </Portal>
  </Provider>
);

const styles = StyleSheet.create({
  layout: {
    backgroundColor: Theme.colors.background
  },
  contentText: {
    color: Theme.colors.text,
    textAlign: 'center'
  },
  okButton: {
    marginHorizontal: 10
  }
});

export default Confirmation;
