import * as React from 'react';
import { noop } from 'lodash';

import { useRequest } from 'hooks/service';
import { useProductTags, parser } from 'hooks/products';
import { ProductTagsDialog, useProduct } from '../product-tags-dialog';

jest.mock('hooks/service');
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

describe('useProduct', () => {
  const spyUseState = jest.spyOn(React, 'useState');
  const request = jest.fn();
  const mutate = jest.fn();
  const onSubmit = jest.fn();

  const tagField = 'shop_tags';
  const product = {
    shop_tags: 'super,carniceria',
    name: 'Aceitunas'
  };

  beforeEach(() => {
    useRequest.mockImplementation(() => request);
    useProductTags.mockImplementation(() => ({ tags, loading: false, mutate }));
    React.useState.mockImplementation(() => [product.shop_tags, jest.fn]);
  });

  afterEach(() => {
    request.mockClear();
    mutate.mockClear();
    onSubmit.mockClear();
    spyUseState.mockReset();
  });

  test('state', () => {
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
  });

  test('onSubmit', () => {
    const { tagValue, onSubmitPress } = useProduct({
      product,
      onSubmit,
      tagField
    });

    onSubmitPress();

    expect(request).toBeCalledWith({
      url: `/products/${product.id}`,
      method: 'put',
      data: { [tagField]: tagValue }
    });

    expect(mutate).toBeCalledWith({ ...product, [tagField]: tagValue });
    expect(onSubmit).toBeCalledWith(tagValue);
  });
});
