import * as yup from 'yup';

const username = yup
  .string()
  .required('Username is required')
  .trim('Username cannot contain leading and trailing spaces')
  .strict(true)
  .min(3, 'Username must be at least 3 characters long')
  .max(40, 'Username cannot exceed 40 characters')
  .label('Username');

const email = yup
  .string()
  .required('Email is required')
  .lowercase('Only lowercase letters')
  .max(128, 'Email cannot exceed 128 characters')
  .email('Invalid email')
  .label('Email');

const password = yup
  .string()
  .required('Password is required')
  .trim('Password cannot contain leading and trailing spaces')
  .strict(true)
  .min(6, 'Password must be at least 6 characters long')
  .max(72, 'Password cannot exceed 72 characters')
  .matches(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[#$!.%& *?])[A-Za-z\d#$!.%& *?]{6,72}$/,
    'Password must contain, one uppercase, one number and one special case character: # $ ! . % & * ? ',
  )
  .label('Password');

const confirmPassword = yup
  .string()
  .required('Repeat password is required')
  .oneOf([yup.ref('password')], "Passwords don't match.")
  .label('Confirmed password');

/**
 * @openapi
 * components:
 *  schemas:
 *    RegisterInput:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        username:
 *          type: string
 *          default: Jone
 *        email:
 *          type: string
 *          default: email@gmail.com
 *        password:
 *          type: string
 *          default: StrongPassword!1
 *        passwordConfirmation:
 *          type: string
 *          default: StrongPassword!1
 *    RegisterResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 */

const registerSchema = yup.object({
  username,
  email,
  password,
  confirmPassword,
});

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          default: email@gmail.com
 *        password:
 *          type: string
 *          default: StrongPassword!1
 *    LoginResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 */

const loginSchema = yup.object({
  email,
  password,
});

export { loginSchema, registerSchema };
