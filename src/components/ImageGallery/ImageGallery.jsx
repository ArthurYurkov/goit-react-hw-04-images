import React, { Component } from 'react';
import styles from './styles.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    bigPic: null,
  };

  // componentDidMount() {
  //   document.addEventListener('click', e => {
  //     if (e.target.nodeName !== 'IMG') {
  //       this.setState({ showModal: false });
  //       return;
  //     } else {
  //       let picture = this.props.images.filter(obj => {
  //         return obj.id === parseInt(e.target.alt);
  //       });
  //       this.setState({ bigPic: picture[0].largeImageURL });
  //     }
  //   });
  // }

  toggleModal = bigPic => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
    this.setState({ bigPic: bigPic });
  };

  closeModal = () => {
    this.setState({ showModal: false, bigPic: '' });
  };

  render() {
    const { showModal, bigPic } = this.state;
    return (
      <>
        <ul className={styles.gallery}>
          {this.props.images.map(img => {
            return (
              <ImageGalleryItem
                key={nanoid()}
                smallImgURL={img.webformatURL}
                id={img.id}
                onClick={this.toggleModal}
                largeImageURL={img.largeImageURL}
              />
            );
          })}
        </ul>
        {showModal && bigPic && (
          <Modal
            onClose={this.toggleModal}
            pic={bigPic}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
