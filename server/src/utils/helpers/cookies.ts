import { CookieOptions, Request } from 'express';

export enum CookieNames {
  refreshToken = 'refreshToken',
}

export const cookieOptions: { [key in CookieNames]: CookieOptions } = {
  refreshToken: {
    maxAge: 1000 * 60 * 60 * 60 * 24 * 30,
    httpOnly: true,
    domain: 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  },
};

export const getRefreshTokenFromCookies = (req: Request) =>
  req.headers.cookie
    ?.split(';')
    .find((cookie) => cookie.includes(CookieNames.refreshToken))
    ?.split('=')[1];
