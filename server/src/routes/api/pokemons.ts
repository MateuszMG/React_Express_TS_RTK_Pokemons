import express from 'express';

import { pokemonsController } from '../../controllers/pokemons';

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
pokemonsRouter.get('/pokemons', pokemonsController.getPokemons);

/**
 * @openapi
 * '/api/pokemons':
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
pokemonsRouter.post('/pokemons', pokemonsController.addPokemon);

export { pokemonsRouter };
