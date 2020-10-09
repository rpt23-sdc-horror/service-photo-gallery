import React from 'react';
import PhotoCard from './PhotoCard.jsx';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    window.scrollTo({
      top: this.props.scroll,
      behavior: 'auto',
    });
  }

  render() {
    const photosList = this.props.photos.map((photo, index) => <PhotoCard url={photo} key={index} index={index} />);

    return (
      <div id="photo-modal" className={this.props.show ? 'active' : 'hidden'}>
        <button id="close-btn" onClick={this.props.hide}>x</button>
        {photosList}
      </div>
    );
  }
}

export default PhotoCarousel;
