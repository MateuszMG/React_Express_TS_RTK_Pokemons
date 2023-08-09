import { useEffect } from 'react';

import { HandleRefetchFilter } from '../../components/global/Pagination/Pagination';

import { defaultPage, defaultPageSize } from '../../utils/config/const';

import { getPokemons } from '../../redux/pokemons/pokemonsActions';
import { useAppDispatch, useAppSelector } from '../../redux/store';

export const useHome = () => {
  const dispatch = useAppDispatch();
  const { page, totalCount, pokemons, loading } = useAppSelector().pokemons;

  const handleRefetch = (filter: HandleRefetchFilter) => {
    dispatch(getPokemons(filter));
  };

  useEffect(() => {
    if (loading || totalCount) return;

    handleRefetch({
      page: defaultPage,
      pageSize: defaultPageSize,
    });
  }, []);

  return { handleRefetch, loading, page, totalCount, pokemons };
};
