import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';

import find from 'lodash/find';
import get from 'lodash/get';

import { composeHooks } from 'utils/language';
import { useRequestSWR } from 'hooks/service';
import { useNavigateBack } from 'hooks/navigation';
import { SafeAreaLayout, SaveAreaInset } from 'components/safe-area-layout';

import { Toolbar } from 'components/toolbar';
import Spinner from 'components/spinner';

import IngredientForm from './ingredient-form';

export const IngredientEdit = ({ title, item }) => (
  <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
    <Toolbar title={title} onBackPress={useNavigateBack()} />
    {!item ? (
      <Spinner bar />
    ) : (
      <IngredientForm
        defaultValues={item}
        submitIcon="content-save"
        onSubmit={(data) => {
          console.log(data);
        }}
      />
    )}
  </SafeAreaLayout>
);

IngredientForm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string
    })
  })
};

IngredientForm.defaultProps = {
  route: {
    params: { title: '' }
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 0,
    position: 'relative'
  }
});

export const useGroceries = ({
  route: {
    params: { id, title }
  }
}) => {
  const { data } = useRequestSWR(
    {
      url: `/shopping-lists`
    },
    { withPlace: true }
  );

  const item = data && find(get(data, '[0].groceries'), { id });

  return {
    title,
    item
  };
};

export default composeHooks({ useGroceries })(IngredientEdit);
