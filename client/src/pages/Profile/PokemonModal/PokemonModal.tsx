import { useNavigate } from 'react-router-dom';

import { Button } from '../../../components/global/Button/Button';
import { Modal } from '../../../components/global/Modal/Modal';

import { UseModal } from '../../../hooks/useModal';

import { paths } from '../../../routes/paths';

import { SavedPokemon } from '../../../redux/user/userSlice';
import styles from './PokemonModal.module.scss';

interface PokemonModalProps extends UseModal {
  handleDeleteSavedPokemon: () => void;
  pokemon: SavedPokemon;
}

export const PokemonModal = ({
  handleDeleteSavedPokemon,
  pokemon,
  ...modalData
}: PokemonModalProps) => {
  const navigate = useNavigate();

  const navigateToPokemon = () => navigate(paths.pokemon(pokemon.pokemonId));

  return (
    <Modal {...modalData}>
      <h1 className={styles.title}>{pokemon.name}</h1>

      <div>
        <Button onClick={handleDeleteSavedPokemon}> Delete </Button>
        <Button onClick={navigateToPokemon}>Show</Button>
      </div>
    </Modal>
  );
};
