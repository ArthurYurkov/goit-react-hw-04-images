import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  largeImageURL,
  smallImgURL,
  id,
  onClick,
}) {
  return (
    <li className={styles.galleryItem} onClick={() => onClick(largeImageURL)}>
      <img src={smallImgURL} alt={id} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};
