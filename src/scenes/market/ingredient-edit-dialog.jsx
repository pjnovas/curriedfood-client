import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import get from 'lodash/get';
import Theme from 'theme';
import Chips from 'components/chips';

export const IngredientEdit = ({ onDismiss, onSubmit, allTags, ...item }) => {
  const [tags, setValue] = useState(get(item, 'product.shop_tags', ''));

  return (
    <Portal>
      <Dialog style={styles.layout} visible dismissable onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>{item.product.name}</Dialog.Title>
        <Dialog.Content style={styles.content}>
          <Chips
            list={allTags}
            value={tags}
            onChange={(value) => {
              setValue(value);
              console.log(value);
            }}
          />
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button onPress={onDismiss}>Cancelar</Button>
          <Button
            dark
            mode="contained"
            style={styles.okButton}
            onPress={() => onSubmit(tags)}
          >
            OK
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  layout: {},
  title: {
    color: Theme.colors.text,
    textAlign: 'center'
  },
  content: {
    minHeight: 100,
    maxHeight: 400
  },
  actions: {},
  okButton: {
    marginHorizontal: 10
  }
});

// export const useFormMarket = () => ({
//   form: useForm()
// });

// export default composeHooks({ useFormMarket })(IngredientEdit);
export default IngredientEdit;
