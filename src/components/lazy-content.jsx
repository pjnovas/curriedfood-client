import React from 'react';
import PropTypes from 'prop-types';
import { Layout, StyleService, Text, Spinner } from '@ui-kitten/components';

const LazyContent = ({ data, isLoading, error, View }) => (
  <Layout style={styles.container}>
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

const styles = StyleService.create({
  container: {
    flex: 1
  }
});

export default LazyContent;
