/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card.jsx';

import styles from './main.module.css';

// eslint-disable-next-line react/prefer-stateless-function -- refactor later
class CarouselModal extends React.Component {
  render() {
    const { photo, active, clickHideModal } = this.props;
    return (
      <div id="carousel-modal" className={`${styles.modal} ${active ? styles.active : ''}`}>
        <button type="button" className={styles.closeBtn} onClick={clickHideModal}>x</button>
        <Card url={photo} />
      </div>
    );
  }
}

CarouselModal.propTypes = {
  active: PropTypes.bool.isRequired,
  clickHideModal: PropTypes.func,
  photo: PropTypes.string,
};

CarouselModal.defaultProps = {
  photo: '',
  clickHideModal: () => {},
};

export default CarouselModal;
