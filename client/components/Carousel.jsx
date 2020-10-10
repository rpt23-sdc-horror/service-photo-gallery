/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';
import CarouselModal from './CarouselModal.jsx';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false,
      selectedIndex: 0,
    };
  }

  prevSlide = () => {
    const { selectedIndex } = this.state;
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
    this.setState({
      selectedIndex: newIndex,
    });
  }

  nextSlide = () => {
    const { selectedIndex } = this.state;
    const { photos } = this.props;
    const newIndex = selectedIndex < photos.length - 1 ? selectedIndex + 1 : photos.length - 1;
    this.setState({
      selectedIndex: newIndex,
    });
  }

  clickShowModal = () => {
    this.setState({
      modalActive: true,
    });
  }

  clickHideModal = () => {
    this.setState({
      modalActive: false,
    });
  }

  generateSliderCards() {
    const { photos } = this.props;
    const { selectedIndex } = this.state;
    return photos.map((photo, index) => (
      <Card
        url={photo}
        key={index}
        index={index}
        active={index === selectedIndex}
        clickShowModal={this.clickShowModal}
      />
    ));
  }

  render() {
    const { photos } = this.props;
    const { selectedIndex, modalActive } = this.state;
    const selectedPhoto = photos[selectedIndex];

    return (
      <>
        <CarouselModal
          active={modalActive}
          photo={selectedPhoto}
          clickHideModal={this.clickHideModal}
        />
        <div id="carousel">
          <button type="button" className="prev-btn" onClick={this.prevSlide}>&#10094;</button>
          <button type="button" className="next-btn" onClick={this.nextSlide}>&#10095;</button>
          <div id="slider">
            {this.generateSliderCards()}
          </div>
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
};

Carousel.defaultProps = {
  photos: [],
};

export default Carousel;
