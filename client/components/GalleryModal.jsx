/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';

import styles from './Gallery.module.css';

class GalleryModal extends React.Component {
  componentDidUpdate() {
    const { scroll } = this.props;
    window.scrollTo({
      top: scroll,
      behavior: 'auto',
    });
  }

  generateModalCards() {
    const { photos } = this.props;
    return photos.map(
      (photo, index) => <Card url={photo} key={index} index={index} />,
    );
  }

  render() {
    const { active, clickHideModal } = this.props;
    return (
      <div id="gallery-modal" className={`${styles.modal} ${active ? styles.active : ''}`}>
        <button type="button" className={styles.closeBtn} onClick={clickHideModal}>x</button>
        {this.generateModalCards()}
      </div>
    );
  }
}

GalleryModal.propTypes = {
  scroll: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  clickHideModal: PropTypes.func,
  photos: PropTypes.arrayOf(PropTypes.string),
};

GalleryModal.defaultProps = {
  photos: [],
  clickHideModal: () => {},
};

export default GalleryModal;
