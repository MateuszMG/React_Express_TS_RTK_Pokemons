import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPokemon } from '../../redux/pokemons/pokemonsActions';
import { setSelectedPokemon } from '../../redux/pokemons/pokemonsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

export const usePokemon = () => {
  const { pokemonId } = useParams<{ pokemonId?: string }>();

  const { loading, pokemons, selectedPokemon } = useAppSelector().pokemons;
  const dispatch = useAppDispatch();

  const handleSavePokemon = () => {};

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!pokemonId || loading || selectedPokemon) return;

    const pokemon = pokemons?.find((pokemon) => pokemon.id === pokemonId);

    pokemon
      ? dispatch(setSelectedPokemon(pokemon))
      : dispatch(getPokemon({ id: pokemonId }));

    return () => {
      dispatch(setSelectedPokemon(undefined));
    };
  }, []);

  return { handleSavePokemon, loading, selectedPokemon };
};
