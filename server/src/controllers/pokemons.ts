import { NextFunction, Response } from 'express';

import { PokemonInput, PokemonModel } from '../models/pokemons';

import { controllerResponseTimeHistogram } from '../utils/metrics';
import { addPokemonSchema, getPokemonsSchema } from '../utils/schemas/pokemons';
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
        .skip(page * pageSize)
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

      const pokemon = await new PokemonModel<PokemonInput>({
        imageUrl,
        name,
        pokemonId,
        userId,
      }).save();

      res.status(201).json({ pokemon });
      timer({ method: req.method, route: req.originalUrl, success: 'true' });
    } catch (error) {
      timer({ method: req.method, route: req.originalUrl, success: 'false' });
      next(error);
    }
  },
};
