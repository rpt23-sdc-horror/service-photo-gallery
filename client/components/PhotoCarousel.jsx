/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import PhotoCard from './PhotoCard.jsx';
import PhotoModal from './PhotoModal.jsx';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      modalScroll: 0,
      currentIndex: 0,
    };
  }

  prevSlide = () => {
    const { currentIndex } = this.state;
    const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    this.setState({
      currentIndex: newIndex,
    });
  }

  nextSlide = () => {
    const { currentIndex } = this.state;
    const { photos } = this.props;
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : photos.length - 1;
    this.setState({
      currentIndex: newIndex,
    });
  }

  clickPhotoOpen = () => {
    this.setState({
      modalShow: true,
    });
  }

  hideModal = () => {
    this.setState({
      modalShow: false,
    });
  }

  render() {
    const { currentIndex, modalShow, modalScroll } = this.state;
    const { photos } = this.props;

    const photosList = photos.map((photo, index) => (
      <PhotoCard
        url={photo}
        key={index}
        activeIndex={currentIndex}
        index={index}
        clickPhotoOpen={this.clickPhotoOpen}
      />
    ));

    return (
      <>
        <PhotoModal
          show={modalShow}
          photos={[photos[currentIndex]]}
          scroll={modalScroll}
          hide={this.hideModal}
        />
        <div id="photo-carousel">
          <button type="button" className="prev-btn" onClick={this.prevSlide}>&#10094;</button>
          <button type="button" className="next-btn" onClick={this.nextSlide}>&#10095;</button>
          <div id="slider">
            {photosList}
          </div>
        </div>
      </>
    );
  }
}

PhotoCarousel.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
};

PhotoCarousel.defaultProps = {
  photos: [],
};

export default PhotoCarousel;
