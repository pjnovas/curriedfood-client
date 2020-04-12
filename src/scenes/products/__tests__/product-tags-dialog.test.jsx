import * as React from 'react';
import { noop } from 'lodash';
import { useProductTags, parser } from 'hooks/products';
import { ProductTagsDialog, useProduct } from '../product-tags-dialog';

jest.mock('hooks/products');

const tags = ['verduleria', 'super', 'carniceria'];

const props = {
  title: 'Aceitunas',
  tags,
  tagValue: 'super,carniceria',
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
  useProductTags.mockImplementation(() => ({ tags, loading: false }));

  const product = {
    shop_tags: 'super,carniceria',
    name: 'Aceitunas'
  };

  const onSubmit = jest.fn();
  const tagField = 'shop_tags';

  const spyUseState = jest.spyOn(React, 'useState');
  React.useState.mockImplementation(() => [product.shop_tags, jest.fn]);

  const result = useProduct({ product, onSubmit, tagField });

  expect(useProductTags).toBeCalledWith(parser.shop_tags);
  expect(React.useState).toBeCalledWith(product.shop_tags);

  expect(result).toEqual(
    expect.objectContaining({
      tagValue: product.shop_tags,
      title: product.name,
      tags: tags
    })
  );

  result.onSubmitPress();
  expect(onSubmit).toBeCalledWith(result.tagValue);

  spyUseState.mockReset();
});
