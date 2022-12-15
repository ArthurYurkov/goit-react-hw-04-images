import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modalRoot');

export default function Modal({ pic, closeModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        return closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdrop}>
      <div className={styles.modal}>
        <img src={pic} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  pic: PropTypes.string,
  closeModal: PropTypes.func,
};
