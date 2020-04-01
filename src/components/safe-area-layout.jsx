import React from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

export const SaveAreaInset = {
  TOP: 'top',
  BOTTOM: 'bottom'
};

export const SafeAreaLayout = (props) => {
  const safeAreaInsets = useSafeArea();
  const { insets, style, ...layoutProps } = props;

  const toStyleProp = (inset) => {
    switch (inset) {
      case SaveAreaInset.BOTTOM:
        return { paddingBottom: safeAreaInsets.bottom };
      case SaveAreaInset.TOP:
        return { paddingTop: safeAreaInsets.top };
    }
  };

  const createInsets = () => React.Children.map(insets, toStyleProp);

  return <View {...layoutProps} style={[style, createInsets()]} />;
};
