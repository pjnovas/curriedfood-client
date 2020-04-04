import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Paragraph } from 'react-native-paper';

import { AppRoute } from 'navigation/app-routes';
import { useNavigateTo } from 'hooks/navigation';
import Confirm from 'components/confirmation';
import Theme from 'theme';

export const ConfirmDialog = ({ ingredients, servings, onDismiss }) => {
  const openShopCart = useNavigateTo(AppRoute.MARKET);
  const [loading, setLoading] = useState(false);

  // add useEffect when setConfirmation
  // > fire do a fetch + post for the shopping cart

  return (
    <Confirm
      visible
      onConfirm={() => {
        setLoading(true);
        // TEST CODE
        setTimeout(() => {
          setLoading(false);
          onDismiss();
          openShopCart();
        }, 2000);
      }}
      title="Enviar al carrito de compras?"
      okText="Enviar"
      onDismiss={onDismiss}
      loading={loading}
    >
      <Paragraph
        style={styles.contentText}
      >{`Se agregarán ${ingredients.length} Ingredientes para ${servings} Porciones`}</Paragraph>
    </Confirm>
  );
};

const FabButton = ({ ingredients, servings }) => {
  const [confirmVisible, setConfirmVisible] = useState(false);

  if (!ingredients.length) return null;

  return confirmVisible ? (
    <ConfirmDialog
      {...{ ingredients, servings, onDismiss: () => setConfirmVisible(false) }}
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
