import 'react-native';
import React from 'react';
import EnzymeToJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import noop from 'lodash/noop';
import isFunction from 'lodash/isFunction';

global.takeSnapshotFrom = (wrapper) => {
  expect(EnzymeToJson(wrapper)).toMatchSnapshot();
};

global.takeSnapshot = (props, Component, options) => {
  const wrapper = shallow(<Component {...props} />, options);
  global.takeSnapshotFrom(wrapper);
};

global.takeSnapshots = (cases, Component, { dive, ...options } = {}) => {
  Object.keys(cases).map((name) =>
    test(name, () => {
      let result = {
        pre: noop,
        props: cases[name],
        post: noop,
        options: {}
      };

      if (isFunction(cases[name])) {
        result = {
          ...result,
          ...cases[name]()
        };
      }

      result.pre();

      let component;

      if (dive) {
        const { wrappingComponent, wrappingComponentProps, ...opts } = options;
        if (!wrappingComponent) {
          throw new Error(
            'expected wrappingComponent in takeSnapshots options'
          );
        }

        const wrapper = shallow(
          <wrappingComponent {...wrappingComponentProps}>
            <Component {...result.props} />
          </wrappingComponent>,
          {
            ...opts,
            ...result.options
          }
        );

        component = wrapper.children().first().dive();
        global.takeSnapshotFrom(component);
      } else {
        global.takeSnapshot(result.props, Component, {
          ...options,
          ...result.options
        });
      }

      result.post();
    })
  );
};
