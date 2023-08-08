import { separateStringOnSlashes } from './strings';

export const setWebsiteTitle = (path: string) => {
  document.title =
    path === '/' ? 'Pokemons' : separateStringOnSlashes(path.slice(1));
};
