import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

global.takeSnapshots = (cases, Component) => {
  Object.keys(cases).map((name) =>
    test(name, () => {
      const tree = renderer.create(<Component {...cases[name]} />).toJSON();
      expect(tree).toMatchSnapshot();
    })
  );
};
