import { Loader } from '../../components/global/Loader/Loader';
import { Pagination } from '../../components/global/Pagination/Pagination';

import { PokemonModal } from './PokemonModal/PokemonModal';
import styles from './Profile.module.scss';
import { useProfile } from './useProfile';

export const Profile = () => {
  const {
    handleDeleteSavedPokemon,
    handleOpenPokemonModal,
    handleRefetch,
    loading,
    pagination,
    pokemonModal,
    savedPokemons,
    selectedPokemon,
  } = useProfile();

  return (
    <>
      <Pagination
        handleRefetch={handleRefetch}
        loading={!!loading}
        page={pagination?.page || 1}
        total={pagination?.total || 0}
      />

      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader size={48} />
        </div>
      ) : (
        <div className={styles.pokemons}>
          {savedPokemons?.map((pokemon) => (
            <div key={pokemon.pokemonId} className={styles.pokemon}>
              <img
                alt={'image ' + pokemon.name}
                className={styles.image}
                loading={'lazy'}
                onClick={() => handleOpenPokemonModal(pokemon)}
                src={pokemon.imageUrl}
              />
            </div>
          ))}
        </div>
      )}

      {!!selectedPokemon && (
        <PokemonModal
          {...pokemonModal}
          handleDeleteSavedPokemon={handleDeleteSavedPokemon}
          pokemon={selectedPokemon}
        />
      )}
    </>
  );
};
