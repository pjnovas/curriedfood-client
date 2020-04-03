import 'react-native';
import React from 'react';
import EnzymeToJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import isFunction from 'lodash/isFunction';

global.takeSnapshot = (wrapper) => {
  expect(EnzymeToJson(wrapper)).toMatchSnapshot();
};

global.takeSnapshots = (cases, Component) => {
  Object.keys(cases).map((name) =>
    test(name, () => {
      let result = {
        pre: noop,
        props: cases[name],
        post: noop,
        options: noop()
      };

      if (isFunction(cases[name])) {
        result = {
          ...result,
          ...cases[name]()
        };
      }

      result.pre();

      const component = shallow(
        <Component {...result.props} />,
        result.options
      );

      global.takeSnapshot(component);

      result.post();
    })
  );
};
