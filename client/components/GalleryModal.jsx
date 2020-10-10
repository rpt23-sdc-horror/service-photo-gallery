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

  render() {
    const { show, photos, hide } = this.props;
    const photosList = photos.map(
      (photo, index) => <Card url={photo} key={index} index={index} />,
    );
    return (
      <div id="photo-modal" className={show ? 'active' : 'hidden'}>
        <button type="button" id="close-btn" onClick={hide}>x</button>
        {photosList}
      </div>
    );
  }
}

GalleryModal.propTypes = {
  scroll: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  hide: PropTypes.func,
  photos: PropTypes.arrayOf(PropTypes.string),
};

GalleryModal.defaultProps = {
  photos: [],
  hide: () => {},
};

export default GalleryModal;
