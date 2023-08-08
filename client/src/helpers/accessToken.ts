import jwtDecode from 'jwt-decode';

import { UserRoles } from '../utils/config/const';

import { addToLS, removeFromLS } from './localStorage';

export interface DecodedJWT {
  _id: string;
  exp: number;
  iat: number;
  roles: UserRoles[];
}

export interface User extends DecodedJWT {
  accessToken: string;
  logged: boolean;
}

export const emptyUser: User = {
  _id: '',
  accessToken: '',
  exp: 0,
  iat: 0,
  logged: false,
  roles: [],
};

export const handleAccessToken = (accessToken: string): User => {
  let user;

  try {
    user = jwtDecode(accessToken) as DecodedJWT;
    if (user.exp * 1000 < Date.now()) user = null;
  } catch (error) {}

  if (!user) {
    removeFromLS('accessToken');
    return emptyUser;
  }

  addToLS('accessToken', accessToken);

  return { ...user!, accessToken, logged: true };
};
