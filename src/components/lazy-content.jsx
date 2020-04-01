import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-paper';
import Layout from './layout';
import Spinner from './spinner';

const LazyContent = ({ data, isLoading, error, View }) => (
  <Layout>
    {isLoading && <Spinner />}
    {error && <Text>Error: {JSON.stringify(error)}</Text>}
    {data && <View data={data} />}
  </Layout>
);

LazyContent.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
  View: PropTypes.any
};

LazyContent.defaultProps = {
  isLoading: true
};

export default LazyContent;
