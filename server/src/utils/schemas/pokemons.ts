import { isValidObjectId } from 'mongoose';
import * as yup from 'yup';

import { errorMessages } from '../errors/errorMessages';

const pokemonId = yup
  .string()
  .required()
  .min(1)
  .max(128)
  .trim()
  .label('Pokemon id');

const imageUrl = yup
  .string()
  .required()
  .min(1)
  .max(512)
  .trim()
  .label('Pokemon image url');

const name = yup
  .string()
  .required()
  .min(1)
  .max(128)
  .trim()
  .label('Pokemon name');

const pageSize = yup.number().default(10).min(1).max(50).label('Limit');
const page = yup.number().default(1).min(1).label('Page');

const id = yup
  .string()
  .required()
  .test('mongoId', errorMessages.invalidParams, (value) =>
    isValidObjectId(value),
  );

/**
 * @openapi
 * components:
 *  schemas:
 *    GetPokemonsInput:
 *      type: object
 *      required:
 *        - pageSize
 *        - page
 *      properties:
 *        pageSize:
 *          type: number
 *          default: 10
 *        page:
 *          type: number
 *          default: 0
 *    GetPokemonsResponse:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *         _id:
 *           type: string
 *         pokemonId:
 *           type: string
 *         imageUrl:
 *           type: string
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 */
export const getPokemonsSchema = yup.object({
  pageSize,
  page,
});

/**
 * @openapi
 * components:
 *  schemas:
 *    AddPokemonInput:
 *      type: object
 *      required:
 *        - pokemonId
 *        - imageUrl
 *        - name
 *      properties:
 *        pokemonId:
 *          type: string
 *          default: PokemonId
 *        imageUrl:
 *          type: string
 *          default: https://image
 *        name:
 *          type: string
 *          default: Pokemon
 *    AddPokemonResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        pokemonId:
 *          type: string
 *        imageUrl:
 *          type: string
 *        name:
 *          type: string
 *        createdAt:
 *          type: string
 */

export const addPokemonSchema = yup.object({
  pokemonId,
  imageUrl,
  name,
});

/**
 * @openapi
 * components:
 *  schemas:
 *    DeletePokemonInput:
 *      type: object
 *      required:
 *        - id
 *      properties:
 *        id:
 *          type: string
 *          default: mongooseId
 */

export const deletePokemonSchema = yup.object({
  id,
});
