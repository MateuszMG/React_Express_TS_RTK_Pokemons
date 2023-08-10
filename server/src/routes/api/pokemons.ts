import express from 'express';

import { pokemonsController } from '../../controllers/pokemons';

import { verifyRoles } from '../../middlewares/verifyRoles';

import { UserRoles } from '../../models/user';

const pokemonsRouter = express.Router();

/**
 * @openapi
 * '/api/pokemons/?pageSize={pageSize}&page={page}':
 *  get:
 *     tags:
 *     - Pokemons
 *     summary: Get pokemons
 *     parameters:
 *      - name: pageSize
 *        in: path
 *        default: 10
 *      - name: page
 *        in: path
 *        default: 0
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetPokemonsResponse'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
pokemonsRouter.get(
  '/pokemons',
  verifyRoles([UserRoles.USER]),
  pokemonsController.getPokemons,
);

/**
 * @openapi
 * '/api/pokemons/?id={id}':
 *  post:
 *     tags:
 *     - Pokemons
 *     summary: Add pokemon
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/AddPokemonInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AddPokemonResponse'
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
pokemonsRouter.post(
  '/pokemons',
  verifyRoles([UserRoles.USER]),
  pokemonsController.addPokemon,
);

/**
 * @openapi
 * '/api/pokemons':
 *  post:
 *     tags:
 *     - Pokemons
 *     summary: Delete pokemon
 *     parameters:
 *      - name: id
 *        in: path
 *        default: mongooseId
 *     responses:
 *      204:
 *        description: Success
 *      400:
 *        description: Bad request
 *      500:
 *        description: Internal server error
 */
pokemonsRouter.delete(
  '/pokemons',
  verifyRoles([UserRoles.USER]),
  pokemonsController.deletePokemon,
);

export { pokemonsRouter };
