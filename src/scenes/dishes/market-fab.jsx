import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Paragraph } from 'react-native-paper';

import { useMarket } from 'hooks/market';
import Confirm from 'components/confirmation';
import Theme from 'theme';

export const ConfirmDialog = ({ ingredients, onDismiss }) => {
  const [state, { addFrom }] = useMarket();

  return (
    <Confirm
      visible
      onConfirm={() => addFrom(ingredients)}
      title="Enviar al carrito de compras?"
      okText="Enviar"
      onDismiss={onDismiss}
      loading={state.status !== 'idle'}
    >
      <Paragraph
        style={styles.contentText}
      >{`Se agregarán ${ingredients.length} Ingredientes`}</Paragraph>
    </Confirm>
  );
};

const FabButton = ({ ingredients }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);

  if (!ingredients.length) return null;

  return confirmVisible ? (
    <ConfirmDialog
      {...{ ingredients, onDismiss: () => setConfirmVisible(false) }}
    />
  ) : (
    <FAB
      style={styles.fab}
      disabled={confirmVisible}
      icon="cart-plus"
      onPress={() => setConfirmVisible(true)}
    />
  );
};

const styles = StyleSheet.create({
  contentText: {
    color: Theme.colors.text,
    textAlign: 'center'
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export default FabButton;
