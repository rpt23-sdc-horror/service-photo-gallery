/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';

// eslint-disable-next-line react/prefer-stateless-function -- refactor later
class CarouselModal extends React.Component {
  render() {
    const { photo, active, clickHide } = this.props;
    return (
      <div id="photo-modal" className={active ? 'active' : 'hidden'}>
        <button type="button" id="close-btn" onClick={clickHide}>x</button>
        <Card url={photo} />
      </div>
    );
  }
}

CarouselModal.propTypes = {
  active: PropTypes.bool.isRequired,
  clickHide: PropTypes.func,
  photo: PropTypes.string,
};

CarouselModal.defaultProps = {
  photo: '',
  clickHide: () => {},
};

export default CarouselModal;
