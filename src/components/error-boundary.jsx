import React from 'react';
import { Text } from 'react-native-paper';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(/* error */) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // TODO: log into a service
    console.log('<<<<<<<<<<<<<<<<<< START ERROR >>>>>>>>>>>>>>>>>>');
    console.log(error, errorInfo);
    console.log('<<<<<<<<<<<<<<<<<< END ERROR >>>>>>>>>>>>>>>>>>');
  }

  render() {
    if (this.state.hasError) {
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
