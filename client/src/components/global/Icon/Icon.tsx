import { ReactNode } from 'react';
import { IconBaseProps } from 'react-icons';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import {
  MdCancel,
  MdOutlineContentCopy,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
} from 'react-icons/md';

import styles from './Icon.module.scss';

interface IconsWrapperProps {
  children: ReactNode;
}

export const IconsWrapper = ({ children }: IconsWrapperProps) => (
  <div className={styles.iconWrapper}>{children}</div>
);

interface IconProps extends IconBaseProps {}

export const LogoutIcon = (props: IconProps) => (
  <FaPowerOff className={styles.icon} {...props} />
);
export const PersonIcon = (props: IconProps) => (
  <BsFillPersonFill className={styles.icon} {...props} />
);
export const CopyIcon = (props: IconProps) => (
  <MdOutlineContentCopy className={styles.icon} {...props} />
);
export const PreviousIcon = (props: IconProps) => (
  <MdOutlineNavigateBefore className={styles.icon} {...props} />
);
export const NextIcon = (props: IconProps) => (
  <MdOutlineNavigateNext className={styles.icon} {...props} />
);
export const CancelIcon = (props: IconProps) => (
  <MdCancel className={styles.icon} {...props} />
);
