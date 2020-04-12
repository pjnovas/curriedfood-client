import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import { get, noop } from 'lodash';

import Theme from 'theme';
import { composeHooks } from 'utils/language';
import Chips from 'components/chips';

export const ProductTagsDialog = ({
  setTagValue,
  onDismiss,
  onSubmitPress,
  title,
  allTags,
  tags
}) => (
  <Portal>
    <Dialog style={styles.layout} visible dismissable onDismiss={onDismiss}>
      <Dialog.Title style={styles.title}>{title}</Dialog.Title>
      <Dialog.Content style={styles.content}>
        <Chips list={allTags} value={tags} onChange={setTagValue} />
      </Dialog.Content>
      <Dialog.Actions style={styles.actions}>
        <Button onPress={onDismiss}>Cancelar</Button>
        <Button
          dark
          mode="contained"
          style={styles.okButton}
          onPress={onSubmitPress}
        >
          OK
        </Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
);

ProductTagsDialog.propTypes = {
  onChange: PropTypes.func,
  onDismiss: PropTypes.func,
  onSubmitPress: PropTypes.func,
  title: PropTypes.string,
  allTags: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.string
};

ProductTagsDialog.defaultProps = {
  onChange: noop,
  onDismiss: noop,
  onSubmitPress: noop,
  title: '',
  allTags: [],
  tags: ''
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

export const useProduct = ({ product, onSubmit, tagField }) => {
  // const allTags = []; // TODO: get tags for a product by fetching all products
  const [tags, setTagValue] = useState(get(product, tagField, ''));
  // TODO: Save product

  return {
    tags,
    title: product.name,
    setTagValue,
    onSubmitPress: () => {
      console.log(tags);
      onSubmit(tags);
    }
  };
};

export default composeHooks({ useProduct })(ProductTagsDialog);
