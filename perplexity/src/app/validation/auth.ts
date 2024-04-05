import { z } from 'zod';

const invalid_type_error = '';
const required_error = 'This field cannot be empty';

export const SignInSchema = z.object({
  email: z
    .string({ invalid_type_error, required_error })
    .email('Please provide valid email'),
  password: z
    .string({ invalid_type_error, required_error })
    .min(5, 'Password is too short'),
});

export const SignUpSchema = z
  .object({
    email: z
      .string({ invalid_type_error, required_error })
      .email('Please provide valid email'),
    password: z
      .string({ invalid_type_error, required_error })
      .min(5, 'Password is too short'),
    confirmPassword: z.string({ invalid_type_error, required_error }).min(5),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });
