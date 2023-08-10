import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';

import { Pokemon, PokemonInput, PokemonModel } from '../models/pokemons';

import { errorMessages } from '../utils/errors/errorMessages';
import { controllerResponseTimeHistogram } from '../utils/metrics';
import {
  addPokemonSchema,
  deletePokemonSchema,
  getPokemonsSchema,
} from '../utils/schemas/pokemons';
import { AppRequest } from '../utils/types';

export const pokemonsController = {
  getPokemons: async (req: AppRequest, res: Response, next: NextFunction) => {
    const timer = controllerResponseTimeHistogram.startTimer();

    try {
      const userId = req.user!._id;

      const { pageSize, page } = await getPokemonsSchema.validate(req.query);

      const documentsCount = await PokemonModel.countDocuments({ userId });

      const pokemons = await PokemonModel.find({ userId })
        .sort({ createdAt: 'asc' })
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .select(['-__v', '-userId', '-updatedAt']);

      res.json({
        pokemons,
        pagination: {
          pageSize,
          page,
          total: documentsCount,
        },
      });
      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },

  addPokemon: async (req: AppRequest, res: Response, next: NextFunction) => {
    const timer = controllerResponseTimeHistogram.startTimer();

    try {
      const userId = req.user!._id;

      const { imageUrl, name, pokemonId } = await addPokemonSchema.validate(
        req.body,
      );

      const pokemonExist = await PokemonModel.findOne({ userId, pokemonId });
      if (!!pokemonExist)
        throw createHttpError(400, { message: errorMessages.pokemonExist });

      const newPokemon = await new PokemonModel<PokemonInput>({
        imageUrl,
        name,
        pokemonId,
        userId,
      }).save();

      const pokemon = newPokemon.toObject() as Pokemon;
      const { __v, userId: _, updatedAt, ...rest } = pokemon;

      res.status(201).json({ pokemon: rest });
      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },

  deletePokemon: async (req: AppRequest, res: Response, next: NextFunction) => {
    const timer = controllerResponseTimeHistogram.startTimer();

    try {
      const { id } = await deletePokemonSchema.validate(req.query);

      await PokemonModel.findByIdAndDelete(id);

      res.sendStatus(204);
      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },
};
