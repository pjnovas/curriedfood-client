import React from 'react';
import PropTypes from 'prop-types';
import { Layout, StyleService, Text, Spinner } from '@ui-kitten/components';

const LazyContent = ({ data, isLoading, error, View, ...props }) => (
  <Layout style={styles.container}>
    {isLoading && <Spinner />}
    {error && <Text>Error: {JSON.stringify(error)}</Text>}
    {data && <View {...props} data={data} />}
  </Layout>
);

LazyContent.propTypes = {
  data: PropTypes.any,
  isLoading: PropTypes.bool,
  error: PropTypes.any,
  View: PropTypes.any
};

const styles = StyleService.create({
  container: {
    flex: 1
  }
});

export default LazyContent;
