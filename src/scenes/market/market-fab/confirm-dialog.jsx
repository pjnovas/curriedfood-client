import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { composeHooks } from 'utils/language';

import { useMarket } from 'hooks/market';
import Confirm from 'components/confirmation';
import Theme from 'theme';

export const ConfirmDialog = ({ ingredients, ...props }) => (
  <Confirm
    visible
    title="Enviar al carrito de compras?"
    okText="Enviar"
    {...props}
  >
    <Paragraph
      style={styles.contentText}
    >{`Se agregarán ${ingredients.length} Ingredientes`}</Paragraph>
  </Confirm>
);

ConfirmDialog.propTypes = {
  ...Confirm.PropTypes,
  ingredients: PropTypes.array
};

ConfirmDialog.defaultProps = {
  ingredients: []
};

const styles = StyleSheet.create({
  contentText: {
    color: Theme.colors.text,
    textAlign: 'center'
  }
});

export const useConfirm = ({ ingredients }) => {
  const [state, { addFrom }] = useMarket();

  return {
    onConfirm: () => addFrom(ingredients),
    loading: state.status !== 'idle'
  };
};

export default composeHooks({ useConfirm })(ConfirmDialog);
