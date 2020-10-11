import React from 'react';
import PropTypes from 'prop-types';

import styles from './Card.module.css';

const Card = ({
  url, index, active, slider, clickShowModal,
}) => {
  let sliderStyle = slider ? styles.slider : '';
  if (active) {
    sliderStyle += ` ${styles.active}`;
  }
  return (
    <div className={`${styles.card} ${sliderStyle}`} onClick={clickShowModal} role="button">
      <img src={url} data-index={index} alt="this is a description" />
    </div>
  );
};

Card.propTypes = {
  url: PropTypes.string,
  index: PropTypes.number,
  slider: PropTypes.bool,
  active: PropTypes.bool,
  clickShowModal: PropTypes.func,
};

Card.defaultProps = {
  url: '',
  index: 0,
  slider: false,
  active: false,
  clickShowModal: () => {},
};

export default Card;
