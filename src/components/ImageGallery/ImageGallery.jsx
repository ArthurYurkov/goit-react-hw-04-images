import React, { useState } from 'react';
import styles from './styles.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default function ImageGallery({ images }) {
  const [bigPic, setBigPic] = useState(null);

  const openModal = bigPic => {
    setBigPic(bigPic);
  };

  const closeModal = () => {
    setBigPic('');
  };

  return (
    <>
      <ul className={styles.gallery}>
        {images.map(img => {
          return (
            <ImageGalleryItem
              key={nanoid()}
              smallImgURL={img.webformatURL}
              id={img.id}
              onClick={openModal}
              largeImageURL={img.largeImageURL}
            />
          );
        })}
      </ul>
      {bigPic && <Modal pic={bigPic} closeModal={closeModal} />}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      largeImageURL: PropTypes.string,
      webformatURL: PropTypes.string,
    })
  ),
};
