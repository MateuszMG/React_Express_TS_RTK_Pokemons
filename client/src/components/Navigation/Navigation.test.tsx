import { fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { emptyUser } from '../../helpers/accessToken';

import { renderWithProviders } from '../../utils/tests/renderWithProviders';

import { paths } from '../../routes/paths';

import { Navigation } from './Navigation';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const loggedOutUserState = {
  ...emptyUser,
  error: undefined,
  loading: false,
  logged: false,
  pagination: undefined,
  savedPokemons: undefined,
};

const loggedInUserState = {
  ...emptyUser,
  error: undefined,
  loading: false,
  logged: true,
  pagination: undefined,
  savedPokemons: undefined,
};

const Ui = () => (
  <MemoryRouter>
    <Navigation />
  </MemoryRouter>
);

describe('<Navigation/>', () => {
  describe('links', () => {
    it('renders links for logged-out user', () => {
      const { getByTestId } = renderWithProviders(<Ui />, {
        preloadedState: { user: loggedOutUserState },
      });

      const loginLink = getByTestId('navigation-link__login');
      const registerLink = getByTestId('navigation-link__register');

      expect(loginLink).toBeInTheDocument();
      expect(registerLink).toBeInTheDocument();
    });

    it('renders buttons for logged-in user', () => {
      const { getByTestId } = renderWithProviders(<Ui />, {
        preloadedState: { user: loggedInUserState },
      });

      const profileButton = getByTestId('button__profile');
      const logoutButton = getByTestId('button__logout');

      expect(profileButton).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });
  });

  describe('actions', () => {
    it('navigates to profile page when profile button is clicked', () => {
      const { getByTestId } = renderWithProviders(<Ui />, {
        preloadedState: { user: loggedInUserState },
      });

      const buttonElement = getByTestId('button__profile');
      fireEvent.click(buttonElement);

      expect(mockedUsedNavigate).toHaveBeenCalledWith(paths.profile);
    });
  });
});
