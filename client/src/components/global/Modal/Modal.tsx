import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { UseModal } from '../../../hooks/useModal';

import { CancelIcon } from '../Icon/Icon';
import styles from './Modal.module.scss';

interface ModalProps extends UseModal {
  children: ReactNode;
}

export const Modal = ({ children, handleClose, open }: ModalProps) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={styles.modal}>
        <div className={styles.buttonWrapper} onClick={handleClose}>
          <CancelIcon />
        </div>
        {children}
      </div>
    </>,
    document.getElementById('modal')!,
  );
};
