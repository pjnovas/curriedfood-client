import { FormInput } from '../form-input.jsx';

jest.mock('formik', () => ({
  useFormikContext: () => ({
    handleChange: jest.fn(),
    errors: {
      'input-id': 'BOOM'
    }
  })
}));

takeSnapshots(
  {
    default: {
      id: 'input-id',
      type: 'text'
    }
  },
  FormInput
);
