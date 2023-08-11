/* eslint-disable testing-library/no-render-in-setup */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { renderWithProviders } from '../../../utils/tests/renderWithProviders';

import { Login } from './Login';
import * as useLoginMock from './useLogin';

describe('<Login />', () => {
  describe('testing of displayed components', () => {
    beforeEach(() => {
      renderWithProviders(<Login />);
    });

    it(`should display title "Login"`, () => {
      const title = screen.getByTestId('text__title');
      expect(title).toBeInTheDocument();
    });

    it(`should display TextInput "email"`, () => {
      const input = screen.getByTestId('input__email');
      expect(input).toBeInTheDocument();
    });

    it(`should display TextInput "password"`, () => {
      const input = screen.getByTestId('input__password');
      expect(input).toBeInTheDocument();
    });

    it(`should display Button "reset"`, () => {
      const input = screen.getByTestId('button__reset');
      expect(input).toBeInTheDocument();
    });

    it(`should display Button "submit"`, () => {
      const input = screen.getByTestId('button__submit');
      expect(input).toBeInTheDocument();
    });
  });

  describe('testing of default content', () => {
    beforeEach(() => {
      renderWithProviders(<Login />);
    });

    it(`should display title "Login"`, () => {
      const title = screen.getByTestId('text__title');
      expect(title).toBeInTheDocument();
    });

    const emailPlaceholder = 'email@email.com';
    it(`should display placeholder "${emailPlaceholder}"`, () => {
      const input = screen.getByTestId('input__email') as HTMLInputElement;
      expect(input.placeholder).toBe(emailPlaceholder);
    });

    const passwordPlaceholder = 'StrongPassword1!';
    it(`should display placeholder "${passwordPlaceholder}"`, () => {
      const input = screen.getByTestId('input__password') as HTMLInputElement;
      expect(input.placeholder).toBe(passwordPlaceholder);
    });

    const resetText = 'Reset';
    it(`should display Button text:  "${resetText}"`, () => {
      const button = screen.getByTestId('button__reset');
      expect(button.textContent).toBe(resetText);
    });

    const submitText = 'Login';
    it(`should display Button text:  "${submitText}"`, () => {
      const button = screen.getByTestId('button__submit');
      expect(button.textContent).toBe(submitText);
    });
  });

  describe('testing of input validation', () => {
    beforeEach(() => {
      mockUseLogin();
    });

    it(`should disable submit button on the beginnig`, () => {
      renderWithProviders(<Login />);

      const button = screen.getByTestId('button__submit') as HTMLButtonElement;
      expect(button.disabled).toBeTruthy();
    });

    it(`should disable submit button 1`, () => {
      const onSubmit = jest.fn();

      mockUseLogin({ onSubmit });
      renderWithProviders(<Login />);

      const inputEmail = screen.getByTestId('input__email');
      const inputPassword = screen.getByTestId('input__password');

      userEvent.clear(inputEmail);
      userEvent.clear(inputPassword);

      userEvent.type(inputEmail, 'inputEmail');
      userEvent.type(inputPassword, 'inputPassword');

      const button = screen.getByTestId('button__submit') as HTMLButtonElement;
      userEvent.click(button);

      expect(button.disabled).toBeTruthy();
    });

    it(`should disable submit button 2`, () => {
      const onSubmit = jest.fn();

      mockUseLogin({ onSubmit });
      renderWithProviders(<Login />);

      const button = screen.getByTestId('button__submit') as HTMLButtonElement;
      userEvent.click(button);

      expect(button.disabled).toBeTruthy();
    });

    it(`should disable submit button 3`, () => {
      const onSubmit = jest.fn();

      mockUseLogin({ onSubmit });
      renderWithProviders(<Login />);

      const inputPassword = screen.getByTestId('input__password');
      userEvent.clear(inputPassword);
      userEvent.type(inputPassword, 'inputPassword');

      const button = screen.getByTestId('button__submit') as HTMLButtonElement;
      userEvent.click(button);

      expect(button.disabled).toBeTruthy();
    });

    it(`should call onSubmit function`, () => {
      const onSubmit = jest.fn();

      mockUseLogin({ onSubmit, isValid: true });
      renderWithProviders(<Login />);

      const button = screen.getByTestId('button__submit') as HTMLButtonElement;
      userEvent.click(button);

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('testing of interactions', () => {
    beforeEach(() => {
      mockUseLogin();
    });

    it(`should not call onSubmit function`, () => {
      const onSubmit = jest.fn();

      mockUseLogin({ onSubmit });
      renderWithProviders(<Login />);

      const button = screen.getByTestId('button__submit');
      userEvent.click(button);
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it(`should call onSubmit function`, () => {
      const onSubmit = jest.fn();

      mockUseLogin({ onSubmit, isValid: true });
      renderWithProviders(<Login />);

      const button = screen.getByTestId('button__submit');
      userEvent.click(button);
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it(`should call reset function`, () => {
      const reset = jest.fn();

      mockUseLogin({ reset });
      renderWithProviders(<Login />);

      const button = screen.getByTestId('button__reset') as HTMLButtonElement;
      userEvent.click(button);

      expect(reset).toHaveBeenCalledTimes(1);
    });
  });
});

const useLoginMockData = {
  errors: {},
  isLogged: false,
  isValid: false,
  loading: false,
  logged: false,
  onSubmit: jest.fn(),
  register: jest.fn(),
  reset: jest.fn(),
};

function mockUseLogin(mockData?: Partial<typeof useLoginMockData>) {
  jest.spyOn(useLoginMock, 'useLogin').mockImplementation(() => ({
    ...useLoginMockData,
    ...mockData,
  }));
}
