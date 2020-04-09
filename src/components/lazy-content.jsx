import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import noop from 'lodash/noop';

import { composeHooks } from 'utils/language';
import Layout from './layout';
import Spinner from './spinner';

export const LazyContent = ({ showActivity, data, error, View }) => (
  <Layout style={{ paddingTop: showActivity ? 0 : 4 }}>
    {showActivity && <Spinner bar />}
    {error && <Text>Error: {JSON.stringify(error)}</Text>}
    {data && <View data={data} />}
  </Layout>
);

LazyContent.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
  View: PropTypes.any,
  revalidate: PropTypes.func
};

LazyContent.defaultProps = {
  isValidating: false,
  isLoading: false,
  revalidate: noop
};

export const useFocus = ({ revalidate, isValidating, data, isLoading }) => {
  useFocusEffect(
    useCallback(() => {
      revalidate();
    }, [revalidate])
  );

  return {
    showActivity: !!(isValidating || data === null || isLoading)
  };
};

export default composeHooks({ useFocus })(LazyContent);
