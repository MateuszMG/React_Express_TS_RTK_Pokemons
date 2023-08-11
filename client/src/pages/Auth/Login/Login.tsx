import { Navigate } from 'react-router-dom';

import { Button } from '../../../components/global/Button/Button';
import { Form } from '../../../components/global/Form/Form';
import { TextInput } from '../../../components/global/TextInput/TextInput';

import { paths } from '../../../routes/paths';

import '../Auth.scss';
import { useLogin } from './useLogin';

export const Login = () => {
  const { errors, loading, logged, isValid, onSubmit, register, reset } =
    useLogin();

  if (logged) return <Navigate to={paths.profile} />;

  return (
    <div className={'page'} data-testid={'page__login'}>
      <Form className={'form'} onReset={() => reset()} onSubmit={onSubmit}>
        <h2 className={'title'} data-testid={'text__title'}>
          Login
        </h2>

        <TextInput
          {...register('email')}
          error={errors?.email?.message}
          label={'Email'}
          placeholder={'email@email.com'}
          testId={'email'}
          type={'email'}
        />

        <TextInput
          {...register('password')}
          error={errors?.password?.message}
          label={'Password'}
          placeholder={'StrongPassword1!'}
          testId={'password'}
          type={'password'}
        />

        <Form.ButtonsWrapper>
          <Button testId={'reset'} isLoading={loading} type={'reset'}>
            Reset
          </Button>

          <Button
            testId={'submit'}
            disabled={!isValid}
            isLoading={loading}
            type={'submit'}
          >
            Login
          </Button>
        </Form.ButtonsWrapper>
      </Form>
    </div>
  );
};
