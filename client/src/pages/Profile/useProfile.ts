import { useEffect, useState } from 'react';

import { HandleRefetchFilter } from '../../components/global/Pagination/Pagination';

import { useModal } from '../../hooks/useModal';

import { defaultPage, defaultPageSize } from '../../utils/config/const';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deletePokemon, getSavedPokemons } from '../../redux/user/userActions';
import { SavedPokemon } from '../../redux/user/userSlice';

export const useProfile = () => {
  const pokemonModal = useModal();
  const [selectedPokemon, setSelectedPokemon] = useState<SavedPokemon>();

  const dispatch = useAppDispatch();
  const { savedPokemons, loading, pagination } = useAppSelector().user;

  const handleRefetch = (filter: HandleRefetchFilter) => {
    dispatch(getSavedPokemons(filter));
  };

  useEffect(() => {
    if (loading || pagination?.total) return;

    dispatch(
      getSavedPokemons({
        page: defaultPage,
        pageSize: defaultPageSize,
      }),
    );
  }, []);

  const handleOpenPokemonModal = (pokemon: SavedPokemon) => {
    setSelectedPokemon(pokemon);
    pokemonModal.handleOpen();
  };

  const handleDeleteSavedPokemon = () => {
    dispatch(deletePokemon({ id: selectedPokemon!._id }));
    setSelectedPokemon(undefined);
    pokemonModal.handleClose();
  };

  return {
    handleDeleteSavedPokemon,
    handleOpenPokemonModal,
    handleRefetch,
    loading,
    pagination,
    pokemonModal,
    savedPokemons,
    selectedPokemon,
  };
};
