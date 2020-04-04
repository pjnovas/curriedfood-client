import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Paragraph } from 'react-native-paper';

import { AppRoute } from 'navigation/app-routes';
import { useNavigateTo } from 'hooks/navigation';
import Confirm from 'components/confirmation';
import Theme from 'theme';

const MarketFab = ({ ingredients, servings }) => {
  const openShopCart = useNavigateTo(AppRoute.MARKET);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!ingredients.length) return null;

  // add useEffect when setConfirmation
  // > fire do a fetch + post for the shopping cart

  return (
    <>
      <FAB
        style={styles.fab}
        disabled={confirmVisible}
        icon="cart-plus"
        onPress={() => setConfirmVisible(true)}
      />
      {confirmVisible && (
        <Confirm
          visible={confirmVisible}
          onConfirm={() => {
            setLoading(true);
            // TEST CODE
            setTimeout(() => {
              setLoading(false);
              setConfirmVisible(false);
              openShopCart();
            }, 2000);
          }}
          onDismiss={() => setConfirmVisible(false)}
          title="Enviar al carrito de compras?"
          okText="Enviar"
          loading={loading}
        >
          <Paragraph
            style={styles.contentText}
          >{`Se agregarán ${ingredients.length} Ingredientes para ${servings} Porciones`}</Paragraph>
        </Confirm>
      )}
    </>
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

export default MarketFab;
