import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import {
  Text,
  Button,
  ButtonGroup,
  Layout,
  StyleService
} from '@ui-kitten/components';

// TODO: Allow a bigger range of numbers using arrows to navigate

const NumericSelector = ({
  label,
  selected,
  onChange,
  min,
  // max,
  visibleItems
}) => (
  <Layout style={styles.container}>
    {label && (
      <Text appearance="hint" category="s1">
        {label}
      </Text>
    )}
    <ButtonGroup
      appearance="outline"
      status="primary"
      style={styles.buttonGroup}
    >
      {/* {items.length && min != items[0] && <Button>{'<'}</Button>} */}
      {times(visibleItems, (i) => i + min).map((i) => (
        <Button
          key={i}
          textStyle={i == selected ? styles.selected : {}}
          onPress={() => onChange(i)}
        >
          {`${i}`}
        </Button>
      ))}
      {/* <Button>{'>'}</Button> */}
    </ButtonGroup>
  </Layout>
);

NumericSelector.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  visibleItems: PropTypes.number,
  onChange: PropTypes.func
};

NumericSelector.defaultProps = {
  selected: 1,
  min: 1,
  visibleItems: 5
};

const styles = StyleService.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10
  },
  buttonGroup: {
    marginVertical: 8
  },
  selected: {
    color: '#FFFFFF' // TODO: get color from theme
  }
});

export default NumericSelector;
