import { Button } from '../../components/global/Button/Button';
import { Loader } from '../../components/global/Loader/Loader';

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
  const { handleSavePokemon, loading, selectedPokemon } = usePokemon();

  if (loading || !selectedPokemon)
    return (
      <div className={styles.loaderWrapper}>
        <Loader size={48} />
      </div>
    );

  return (
    <div>
      <div className={styles.imageWrapper}>
        <img
          alt={'image ' + selectedPokemon.name}
          className={styles.image}
          loading={'lazy'}
          onClick={handleSavePokemon}
          src={selectedPokemon.images.large}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button>Save {selectedPokemon.name}</Button>
      </div>

      <div className={styles.sectionWrapper}>
        <h1>Abilities</h1>
        <div>
          {selectedPokemon.abilities?.map((item) => (
            <div>
              <Section title={'Name'} value={item.name} />
              <Section title={'Type'} value={item.type} />
              <Section title={'Description'} value={item.text} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.sectionWrapper}>
        <h1>Attacks</h1>
        {selectedPokemon.attacks.map((item) => (
          <div>
            <Section title={'Name'} value={item.name} />
            <Section title={'Energy cost'} value={item.convertedEnergyCost} />
            <Section title={'Cost'} value={item.cost.join(', ')} />
            <Section title={'Damage'} value={item.damage} />
            <Section title={'Description'} value={item.text} />
          </div>
        ))}
      </div>

      <div className={styles.sectionWrapper}>
        <h1>Weaknesses</h1>
        {selectedPokemon.weaknesses.map((item) => (
          <Section title={item.type} value={item.value} />
        ))}
      </div>

      <div className={`${styles.sectionWrapper} ${styles.withoutBorder}`}>
        <h1>Resistances</h1>
        {selectedPokemon.resistances?.map((item) => (
          <Section title={item.type} value={item.value} />
        ))}
      </div>
    </div>
  );
};
