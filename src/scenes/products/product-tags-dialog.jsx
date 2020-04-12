import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';
import { get, noop } from 'lodash';

import Theme from 'theme';
import { composeHooks } from 'utils/language';
import { useProductTags, parser } from 'hooks/products';
// import { useRequestSWR } from 'hooks/service';
import Spinner from 'components/spinner';
import Chips from 'components/chips';

export const ProductTagsDialog = ({
  loading,
  setTagValue,
  onDismiss,
  onSubmitPress,
  title,
  tags,
  tagValue
}) => (
  <Portal>
    <Dialog style={styles.layout} visible dismissable onDismiss={onDismiss}>
      <Dialog.Title style={styles.title}>{title}</Dialog.Title>
      <Dialog.Content style={styles.content}>
        {loading ? (
          <Spinner />
        ) : (
          <Chips list={tags} value={tagValue} onChange={setTagValue} />
        )}
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
  tags: PropTypes.arrayOf(PropTypes.string),
  tagValue: PropTypes.string
};

ProductTagsDialog.defaultProps = {
  onChange: noop,
  onDismiss: noop,
  onSubmitPress: noop,
  title: '',
  tags: [],
  tagValue: ''
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
  const { tags, loading } = useProductTags(parser[tagField]);
  const [tagValue, setTagValue] = useState(get(product, tagField, ''));

  return {
    tags,
    tagValue,
    title: product.name,
    loading,
    setTagValue,
    onSubmitPress: () => {
      // TODO: Save product
      console.log(tagValue);
      onSubmit(tagValue);
    }
  };
};

export default composeHooks({ useProduct })(ProductTagsDialog);
