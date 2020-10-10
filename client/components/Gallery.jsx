/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';
import GalleryModal from './GalleryModal.jsx';

import styles from './main.module.css';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      modalScroll: 0,
    };
  }

  clickShowModal = (e) => {
    const photoIndex = +e.target.dataset.index;
    const modalPhotoHeight = window.innerWidth * 1.25 + 8;
    this.setState({
      modalActive: true,
      modalScroll: modalPhotoHeight * photoIndex,
    });
  }

  clickHideModal = () => {
    this.setState({
      modalActive: false,
      modalScroll: 0,
    });
  }

  generateGalleryCards() {
    const { photos } = this.props;
    return photos.map((photo, index) => (
      <Card
        url={photo}
        key={index}
        index={index}
        clickShowModal={this.clickShowModal}
      />
    ));
  }

  render() {
    const { modalActive, modalScroll } = this.state;
    const { photos } = this.props;
    return (
      <>
        <GalleryModal
          photos={photos}
          active={modalActive}
          scroll={modalScroll}
          clickHideModal={this.clickHideModal}
        />
        <div className={styles.gallery}>
          {this.generateGalleryCards()}
        </div>
      </>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
};

Gallery.defaultProps = {
  photos: [],
};

export default Gallery;
