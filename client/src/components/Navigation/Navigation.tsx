import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  convertToSnakeCase,
  separateStringOnSlashes,
} from '../../helpers/strings';

import { paths } from '../../routes/paths';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/user/userActions';
import { LogoutIcon, PersonIcon } from '../global/Icon/Icon';
import styles from './Navigation.module.scss';

interface NavigationLinkProps {
  path: string;
}

const NavigationLink = ({ path }: NavigationLinkProps) => (
  <Link
    className={styles.link}
    data-testid={`navigation-link__${convertToSnakeCase(path.slice(1))}`}
    to={path}
  >
    {path === '/' ? 'Home' : separateStringOnSlashes(path.slice(1))}
  </Link>
);

export const Navigation = () => {
  const { logged } = useAppSelector().user;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <nav data-testid={'navigation'}>
      <div className={styles.list}>
        <NavigationLink path={paths.home} />

        <div className={styles.links}>
          {logged ? (
            <>
              <PersonIcon
                data-testid={'button__profile'}
                fontSize='20px'
                onClick={() => navigate(paths.profile)}
              />
              <LogoutIcon
                data-testid={'button__logout'}
                fontSize='20px'
                onClick={() => dispatch(logout())}
              />
            </>
          ) : (
            <>
              <NavigationLink path={paths.login} />
              <NavigationLink path={paths.register} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
