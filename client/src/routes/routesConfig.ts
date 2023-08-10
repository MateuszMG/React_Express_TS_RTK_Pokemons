import { lazy } from 'react';

import { AppRoles } from '../utils/config/const';

import { Login } from '../pages/Auth/Login/Login';
import { Register } from '../pages/Auth/Register/Register';
import { Home } from '../pages/Home/Home';
import { NotFound } from '../pages/NotFound/NotFound';
import { Pokemon } from '../pages/Pokemon/Pokemon';

import { paths } from './paths';

const Profile = lazy(() =>
  import('../pages/Profile/Profile').then(({ Profile }) => ({
    default: Profile,
  })),
);

export const routesConfig = [
  // EVERYBODY
  {
    component: Home,
    path: paths.home,
    roles: [AppRoles.EVERYBODY],
  },
  {
    component: NotFound,
    path: paths.all,
    roles: [AppRoles.EVERYBODY],
  },
  {
    component: Pokemon,
    path: paths.pokemon(':pokemonId'),
    roles: [AppRoles.EVERYBODY],
  },

  // NOT_LOGGED
  {
    component: Login,
    path: paths.login,
    roles: [AppRoles.NOT_LOGGED],
  },
  {
    component: Register,
    path: paths.register,
    roles: [AppRoles.NOT_LOGGED],
  },

  // USER
  {
    component: Profile,
    path: paths.profile,
    roles: [AppRoles.USER],
  },
];
