import { cleanEnv, num, str } from 'envalid';

export const config = cleanEnv(process.env, {
  REACT_APP_SERVER_URL: str(),
  REACT_APP_REFRESH_TOKEN_BEFORE_EXPIRE: num(),
});
