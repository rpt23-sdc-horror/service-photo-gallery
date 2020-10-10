/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';

class GalleryModal extends React.Component {
  componentDidUpdate() {
    const { scroll } = this.props;
    window.scrollTo({
      top: scroll,
      behavior: 'auto',
    });
  }

  generateCards() {
    const { photos } = this.props;
    return photos.map(
      (photo, index) => <Card url={photo} key={index} index={index} />,
    );
  }

  render() {
    const { show, clickHide } = this.props;
    return (
      <div id="photo-modal" className={show ? 'active' : 'hidden'}>
        <button type="button" id="close-btn" onClick={clickHide}>x</button>
        {this.generateCards()}
      </div>
    );
  }
}

GalleryModal.propTypes = {
  scroll: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  clickHide: PropTypes.func,
  photos: PropTypes.arrayOf(PropTypes.string),
};

GalleryModal.defaultProps = {
  photos: [],
  clickHide: () => {},
};

export default GalleryModal;
