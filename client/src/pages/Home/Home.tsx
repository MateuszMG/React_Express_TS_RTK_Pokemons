import { useNavigate } from 'react-router-dom';

import { Loader, LoaderSizes } from '../../components/global/Loader/Loader';
import { Pagination } from '../../components/global/Pagination/Pagination';

import { paths } from '../../routes/paths';

import { Header } from './Header/Header';
import styles from './Home.module.scss';
import { useHome } from './useHome';

export const Home = () => {
  const { handleRefetch, loading, page, pokemons, totalCount } = useHome();
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <Pagination
        handleRefetch={handleRefetch}
        page={page || 1}
        total={totalCount || 0}
        loading={!!loading}
      />

      <div className={styles.pokemons}>
        {loading ? (
          <Loader size={LoaderSizes.xxl} />
        ) : (
          pokemons?.map(({ id, images, name }) => (
            <div key={id} className={styles.pokemon}>
              <img
                alt={'image ' + name}
                className={styles.image}
                loading={'lazy'}
                onClick={() => navigate(paths.pokemon(id))}
                src={images.large}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
