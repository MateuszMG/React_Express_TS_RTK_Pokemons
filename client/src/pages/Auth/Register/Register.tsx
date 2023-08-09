import { Navigate } from 'react-router-dom';

import { Button } from '../../../components/global/Button/Button';
import { Form } from '../../../components/global/Form/Form';
import { TextInput } from '../../../components/global/TextInput/TextInput';

import { paths } from '../../../routes/paths';

import '../Auth.scss';
import { useRegister } from './useRegister';

export const Register = () => {
  const { errors, isValid, loading, logged, onSubmit, register, reset } =
    useRegister();

  if (logged) return <Navigate to={paths.profile} />;

  return (
    <div className={'page'} data-testid={'page__login'}>
      <Form className={'form'} onReset={() => reset()} onSubmit={onSubmit}>
        <h2 className={'title'} data-testid={'text__title'}>
          Register
        </h2>

        <TextInput
          {...register('username')}
          data-testid={'input__username'}
          error={errors?.username?.message}
          label={'Username'}
          placeholder={'Your name'}
        />

        <TextInput
          {...register('email')}
          data-testid={'input__email'}
          error={errors?.email?.message}
          label={'Email'}
          placeholder={'email@email.com'}
          type={'email'}
        />

        <TextInput
          {...register('password')}
          data-testid={'input__password'}
          error={errors?.password?.message}
          label={'Password'}
          placeholder={'StrongPassword1!'}
          type={'password'}
        />

        <TextInput
          {...register('confirmPassword')}
          data-testid={'input__confirm-password'}
          error={errors?.confirmPassword?.message}
          label={'Repeat password'}
          placeholder={'StrongPassword1!'}
          type={'password'}
        />

        <Form.ButtonsWrapper>
          <Button
            data-testid={'button__reset'}
            isLoading={loading}
            type={'reset'}
          >
            Reset
          </Button>

          <Button
            data-testid={'button__submit'}
            disabled={!isValid}
            isLoading={loading}
            type={'submit'}
          >
            Register
          </Button>
        </Form.ButtonsWrapper>
      </Form>
    </div>
  );
};
