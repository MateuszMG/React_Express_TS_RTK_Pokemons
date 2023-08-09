import { config } from './config';

export const serverApiUrl = `${config.REACT_APP_SERVER_URL}/api`;
export const refreshTokenBeforeExpire =
  config.REACT_APP_REFRESH_TOKEN_BEFORE_EXPIRE;

export const pokemonsApiUrl = 'https://api.pokemontcg.io/v2/cards';

export enum UserRoles {
  USER = 'USER',
}

export enum AppRoles {
  USER = 'USER',
  EVERYBODY = 'EVERYBODY',
  NOT_LOGGED = 'NOT_LOGGED',
}

const pageSizes = [5, 10, 15, 20, 25, 50];
export const pageSizeOptions = pageSizes.map((number) => ({
  value: number.toString(),
  label: number.toString(),
}));

export const defaultPageSize = 10;
export const defaultPage = 1;
export const defaultPageSizeOption = pageSizeOptions.find(
  (option) => +option.value === defaultPageSize,
);

export enum DayjsFormats {
  savedRequest = 'HH:mm:ss - DD MMM',
}
