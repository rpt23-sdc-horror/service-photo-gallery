/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';
import GalleryModal from './GalleryModal.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      scrollModal: 0,
    };
  }

  showModal = (e) => {
    const photoIndex = +e.target.dataset.index;
    const modalPhotoHeight = window.innerWidth * 1.25 + 8;
    this.setState({
      showModal: true,
      scrollModal: modalPhotoHeight * photoIndex,
    });
  }

  hideModal = () => {
    this.setState({
      showModal: false,
      scrollModal: 0,
    });
  }

  generateCards() {
    const { photos } = this.props;
    return photos.map((photo, index) => (
      <Card
        url={photo}
        key={index}
        index={index}
        show={this.showModal}
      />
    ));
  }

  render() {
    const { showModal, scrollModal } = this.state;
    const { photos } = this.props;
    return (
      <>
        <GalleryModal
          photos={photos}
          show={showModal}
          scroll={scrollModal}
          hide={this.hideModal}
        />
        <div id="gallery">
          {this.generateCards()}
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
