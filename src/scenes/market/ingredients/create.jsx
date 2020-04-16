import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { get, noop } from 'lodash';
import { Portal, Dialog, Button, Subheading } from 'react-native-paper';
import Theme from 'theme';

import { composeHooks } from 'utils/language';
import { convert, longName } from 'utils/grocery';
import ProductSelector from 'scenes/products/product-selector';
import NumericInput from './numeric-input';

export const CreateIngredient = ({
  product,
  onSelectProduct,
  quantity,
  onChangeQuantity,
  onDismiss,
  handleSubmit,
  saving,
  canSubmit
}) => (
  <Portal>
    <Dialog visible dismissable onDismiss={() => !saving && onDismiss()}>
      <Dialog.Title style={styles.title}>Nuevo Ingrediente</Dialog.Title>
      <Dialog.Content style={styles.content}>
        <ProductSelector
          style={styles.selector}
          selected={product}
          onPress={onSelectProduct}
        />
        <View style={styles.quantityCtn}>
          <NumericInput
            style={styles.quantity}
            label="Cantidad"
            disabled={!product}
            onChangeValue={onChangeQuantity}
            defaultValue={quantity > 0 ? convert(quantity) : noop()}
          />
          <Subheading style={styles.unit}>
            {product && get(longName, product.unit, '')}
          </Subheading>
        </View>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss} disabled={saving}>
          Cancelar
        </Button>
        <Button
          dark
          disabled={!canSubmit}
          loading={saving}
          mode="contained"
          style={styles.okButton}
          onPress={handleSubmit}
        >
          OK
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

CreateIngredient.propTypes = {
  product: PropTypes.object,
  onSelectProduct: PropTypes.func,
  quantity: PropTypes.number,
  onChangeQuantity: PropTypes.func,
  onDismiss: PropTypes.func,
  onSubmit: PropTypes.func
};

CreateIngredient.defaultProps = {
  onSelectProduct: noop,
  onChangeQuantity: noop,
  onDismiss: noop,
  onSubmit: noop
};

const styles = StyleSheet.create({
  title: {
    color: Theme.colors.text,
    textAlign: 'center'
  },
  content: {
    minHeight: 100,
    maxHeight: 320
  },
  selector: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.roundness
  },
  okButton: {
    marginHorizontal: 10
  },
  quantityCtn: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 10
  },
  quantity: {
    flex: 1
  },
  unit: {
    flex: 1,
    paddingLeft: 10,
    alignSelf: 'flex-end',
    textAlign: 'left',
    color: Theme.colors.disabled
  }
});

export const useCreateForm = ({ onSubmit }) => {
  const [product, onSelectProduct] = useState();
  const [quantity, onChangeQuantity] = useState();
  const [saving, setSaving] = useState(false);

  return {
    product,
    onSelectProduct,
    quantity,
    onChangeQuantity,
    saving,
    canSubmit: product && quantity > 0,
    handleSubmit: () => {
      setSaving(true);
      onSubmit({ product, quantity });
    }
  };
};

export default composeHooks({ useCreateForm })(CreateIngredient);
