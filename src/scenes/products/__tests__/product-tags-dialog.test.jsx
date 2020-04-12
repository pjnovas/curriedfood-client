import * as React from 'react';
import { noop } from 'lodash';
import { ProductTagsDialog, useProduct } from '../product-tags-dialog';

const allTags = ['verduleria', 'super', 'carniceria'];

const props = {
  title: 'Aceitunas',
  allTags,
  tags: 'super,carniceria',
  onSubmitPress: noop,
  setTagValue: noop,
  onDismiss: noop
};

takeSnapshots(
  {
    default: {},
    withData: props
  },
  ProductTagsDialog
);

test('useProduct', () => {
  const product = {
    shop_tags: 'super,carniceria',
    name: 'Aceitunas'
  };

  const onSubmit = jest.fn();
  const tagField = 'shop_tags';

  const spyUseState = jest.spyOn(React, 'useState');
  React.useState.mockImplementation(() => [product.shop_tags, jest.fn]);

  const result = useProduct({ product, onSubmit, tagField });

  expect(React.useState).toBeCalledWith(product.shop_tags);
  expect(result.tags).toEqual(product.shop_tags);
  expect(result.title).toEqual(product.name);

  result.onSubmitPress();
  expect(onSubmit).toBeCalledWith(result.tags);

  spyUseState.mockReset();
});
