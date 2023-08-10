import { Button } from '../../components/global/Button/Button';
import { Loader, LoaderSizes } from '../../components/global/Loader/Loader';

import styles from './Pokemon.module.scss';
import { usePokemon } from './usePokemon';

interface SectionProps {
  title: string;
  value: string | number;
}

const Section = ({ title, value }: SectionProps) => (
  <div className={styles.section}>
    <h3 className={styles.section__title}>{title}:</h3>
    <p>{value}</p>
  </div>
);

export const Pokemon = () => {
  const {
    handleSavePokemon,
    isSavedPokemon,
    logged,
    pokemonsLoading,
    selectedPokemon,
    userLoading,
  } = usePokemon();

  if (pokemonsLoading || !selectedPokemon)
    return (
      <div className={styles.loaderWrapper}>
        <Loader size={LoaderSizes.xxl} />
      </div>
    );

  return (
    <div>
      <div className={styles.imageWrapper}>
        <img
          alt={'image ' + selectedPokemon.name}
          className={styles.image}
          loading={'lazy'}
          src={selectedPokemon.images.large}
        />
      </div>

      {logged && (
        <div className={styles.buttonWrapper}>
          {isSavedPokemon ? (
            <h2>{selectedPokemon.name} has been saved</h2>
          ) : (
            <Button onClick={handleSavePokemon} isLoading={userLoading}>
              Save {selectedPokemon.name}
            </Button>
          )}
        </div>
      )}

      {selectedPokemon.abilities?.length && (
        <div className={styles.chapter}>
          <h1>Abilities</h1>
          <div>
            {selectedPokemon.abilities.map((item) => (
              <div key={item.name} className={styles.sectionWrapper}>
                <Section title={'Name'} value={item.name} />
                <Section title={'Type'} value={item.type} />
                <Section title={'Description'} value={item.text} />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPokemon.attacks?.length && (
        <div className={styles.chapter}>
          <h1>Attacks</h1>
          {selectedPokemon.attacks?.map((item) => (
            <div key={item.name} className={styles.sectionWrapper}>
              <Section title={'Name'} value={item.name} />
              <Section title={'Energy cost'} value={item.convertedEnergyCost} />
              <Section title={'Cost'} value={item.cost.join(', ')} />
              <Section title={'Damage'} value={item.damage} />
              <Section title={'Description'} value={item.text} />
            </div>
          ))}
        </div>
      )}

      {selectedPokemon.weaknesses?.length && (
        <div className={styles.chapter}>
          <h1>Weaknesses</h1>
          {selectedPokemon.weaknesses?.map((item) => (
            <div key={item.type} className={styles.sectionWrapper}>
              <Section key={item.type} title={item.type} value={item.value} />
            </div>
          ))}
        </div>
      )}

      {selectedPokemon.resistances?.length && (
        <div className={styles.chapter}>
          <h1>Resistances</h1>
          {selectedPokemon.resistances?.map((item) => (
            <div key={item.type} className={styles.sectionWrapper}>
              <Section title={item.type} value={item.value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
