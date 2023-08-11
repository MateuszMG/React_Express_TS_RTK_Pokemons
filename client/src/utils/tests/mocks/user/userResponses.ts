import { Pagination, SavedPokemon } from '../../../../redux/user/userSlice';

export const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzNjUxOWI0Y2UxNTgyNmE3YjQ0MzQiLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTY5MTczNjMzMCwiZXhwIjoxNjkxNzM5OTMwfQ.9lCxa0PnU4Gm4SEh5hhvsCfo9KnlhBKCec9WRFW5wq4';

const createSavedPokemons = (length: number): SavedPokemon[] =>
  Array(length)
    .fill('')
    .map((_, index: number) => ({
      _id: `_id-${index}`,
      createdAt: 'string',
      imageUrl: 'string',
      name: 'string',
      pokemonId: `pokemonId-${index}`,
    }));

const pagination: Pagination = {
  pageSize: 10,
  page: 0,
  total: 20,
};

export const userResponses = {
  register: { accessToken },
  login: { accessToken },
  refreshToken: { accessToken },
  logout: {},
  getSavedPokemons: { pokemons: createSavedPokemons(3), pagination },
  savePokemon: { pokemon: createSavedPokemons(1)[0] },
  deletePokemon: {},
};
