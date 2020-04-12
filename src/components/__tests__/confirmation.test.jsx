import { noop } from 'lodash';
import Confirmation from '../confirmation';

const props = {
  onDismiss: noop,
  onConfirm: noop,
  title: 'Title',
  children: 'content',
  okText: 'OK!'
};

takeSnapshots(
  {
    default: {},
    visible: {
      ...props,
      visible: true
    },
    loading: {
      ...props,
      visible: true,
      loading: true
    }
  },
  Confirmation
);
