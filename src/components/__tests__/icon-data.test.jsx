import IconData from '../icon-data.jsx';

jest.mock('../icon');

const props = {
  icon: 'clock',
  text: '15"'
};

takeSnapshots(
  {
    default: {
      ...props
    },
    reversed: {
      ...props,
      reverse: true
    },
    asChildren: {
      ...props,
      children: 'BOOM!'
    }
  },
  IconData
);
