import { model, Schema } from 'mongoose';

export interface PokemonInput {
  pokemonId: string;
  userId: string;
  imageUrl: string;
  name: string;
}

export interface Pokemon extends PokemonInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

const pokemonSchema = new Schema<PokemonInput>(
  {
    pokemonId: {
      maxlength: 128,
      minlength: 1,
      required: true,
      trim: true,
      type: String,
    },

    userId: {
      maxlength: 128,
      minlength: 1,
      required: true,
      trim: true,
      type: String,
    },

    name: {
      maxlength: 128,
      minlength: 1,
      required: true,
      trim: true,
      type: String,
    },

    imageUrl: {
      maxlength: 512,
      minlength: 1,
      required: true,
      trim: true,
      type: String,
    },
  },
  { timestamps: true },
);

export const PokemonModel = model('pokemon', pokemonSchema);
