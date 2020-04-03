import ErrorBoundary from '../error-boundary';

takeSnapshots(
  {
    default: {
      children: 'Some component'
    }
  },
  ErrorBoundary
);
