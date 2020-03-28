import React from 'react';
import { Text, Button, Layout } from '@ui-kitten/components';

const IconData = ({ icon, text, reverse, children, ...props }) => (
  <Layout
    style={{
      flexDirection: `row${reverse ? '-reverse' : ''}`,
      alignItems: 'center'
    }}
    {...props}
  >
    <Button
      style={{ marginHorizontal: -18 }}
      appearance="ghost"
      status="basic"
      icon={icon}
    />
    {children || (
      <Text appearance="hint" category="s1">
        {text}
      </Text>
    )}
  </Layout>
);

export default IconData;
