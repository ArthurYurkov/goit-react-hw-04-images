import React, { Component } from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li
        className={styles.galleryItem}
        onClick={() => this.props.onClick(this.props.largeImageURL)}
      >
        <img src={this.props.smallImgURL} alt={this.props.id} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func,
};
