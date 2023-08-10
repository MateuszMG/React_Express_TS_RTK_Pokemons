import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getPokemon } from '../../redux/pokemons/pokemonsActions';
import { setSelectedPokemon } from '../../redux/pokemons/pokemonsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { savePokemon } from '../../redux/user/userActions';

export const usePokemon = () => {
  const { pokemonId } = useParams<{ pokemonId?: string }>();

  const {
    loading: pokemonsLoading,
    pokemons,
    selectedPokemon,
  } = useAppSelector().pokemons;
  const { loading: userLoading, logged, savedPokemons } = useAppSelector().user;
  const dispatch = useAppDispatch();

  const isSavedPokemon = savedPokemons?.find(
    (pokemon) => pokemon.pokemonId === pokemonId,
  );

  const handleSavePokemon = () => {
    if (!selectedPokemon || isSavedPokemon) return;
    dispatch(savePokemon(selectedPokemon));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!pokemonId || pokemonsLoading || selectedPokemon) return;

    const pokemon = pokemons?.find((pokemon) => pokemon.id === pokemonId);

    pokemon
      ? dispatch(setSelectedPokemon(pokemon))
      : dispatch(getPokemon({ id: pokemonId }));

    return () => {
      dispatch(setSelectedPokemon(undefined));
    };
  }, []);

  return {
    handleSavePokemon,
    isSavedPokemon,
    logged,
    pokemonsLoading,
    selectedPokemon,
    userLoading,
  };
};
