import * as Yup from 'yup';

export class SignInData {

  constructor(
    readonly identifier: string,
    readonly password: string) {

  }

  static empty(): SignInData {
    return new SignInData(
      '',
      '',
    );
  }
}

export const SignInSchema = Yup.object().shape({
  identifier: Yup.string().email('Invalid email'),
  password: Yup.string().min(8, 'Password must be at least 8 characters'),
});

