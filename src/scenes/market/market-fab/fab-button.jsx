import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

import { composeHooks } from 'utils/language';
import ConfirmDialog from './confirm-dialog';

export const FabButton = ({ ingredients, visible, onDismiss, onPress }) => {
  if (!ingredients.length) return null;

  return visible ? (
    <ConfirmDialog {...{ ingredients, onDismiss }} />
  ) : (
    <FAB style={styles.fab} icon="cart-plus" onPress={onPress} />
  );
};

FabButton.propTypes = {
  ingredients: PropTypes.array,
  visible: PropTypes.bool,
  onDismiss: PropTypes.func,
  onPress: PropTypes.func
};

FabButton.defaultProps = {
  ingredients: [],
  visible: false
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  }
});

export const useConfirm = () => {
  const [visible, setVisible] = useState(false);

  return {
    visible,
    onDismiss: () => setVisible(false),
    onPress: () => setVisible(true)
  };
};

export default composeHooks({ useConfirm })(FabButton);
