import { rest } from 'msw';

import { serverApiUrl } from '../../../config/const';
import { userResponses } from './userResponses';

export const userHandlers = [
  rest.post(`${serverApiUrl}/register`, (req, res, ctx) => {
    return res(ctx.json(userResponses.register), ctx.delay(150));
  }),
  rest.post(`${serverApiUrl}/login`, (req, res, ctx) => {
    return res(ctx.json(userResponses.login), ctx.delay(150));
  }),
  rest.post(`${serverApiUrl}/logout`, (req, res, ctx) => {
    return res(ctx.json(userResponses.logout), ctx.delay(150));
  }),
  rest.post(`${serverApiUrl}/refreshToken`, (req, res, ctx) => {
    return res(ctx.json(userResponses.refreshToken), ctx.delay(150));
  }),
];
