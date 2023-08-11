import { rest } from 'msw';

import { serverApiUrl } from '../../../config/const';
import { userResponses } from './userResponses';

export const userHandlers = [
  rest.post(`${serverApiUrl}/register`, (req, res, ctx) => {
    return res(ctx.json(userResponses.register));
  }),
  rest.post(`${serverApiUrl}/login`, (req, res, ctx) => {
    return res(ctx.json(userResponses.login));
  }),
  rest.post(`${serverApiUrl}/logout`, (req, res, ctx) => {
    return res(ctx.json(userResponses.logout));
  }),
  rest.post(`${serverApiUrl}/refreshToken`, (req, res, ctx) => {
    return res(ctx.json(userResponses.refreshToken));
  }),
  rest.get(`${serverApiUrl}/pokemons`, (req, res, ctx) => {
    return res(ctx.json(userResponses.getSavedPokemons));
  }),
  rest.post(`${serverApiUrl}/pokemons`, (req, res, ctx) => {
    return res(ctx.json(userResponses.savePokemon));
  }),
  rest.delete(`${serverApiUrl}/pokemons`, (req, res, ctx) => {
    return res(ctx.json(userResponses.deletePokemon));
  }),
];
