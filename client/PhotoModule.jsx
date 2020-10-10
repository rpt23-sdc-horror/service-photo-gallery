/* eslint-disable react/no-array-index-key */
import React from 'react';
import Gallery from './components/Gallery.jsx';
import Carousel from './components/Carousel.jsx';

class PhotoModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      showCarousel: window.innerWidth < 1024 === true,
    };
  }

  componentDidMount() {
    const ids = window.location.pathname.split('/');
    const productId = ids[1];
    const styleId = ids[2];
    this.fetchPhotosByStyle(productId, styleId);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const showCarousel = window.innerWidth < 1024 === true;
    this.setState({
      showCarousel,
    });
  };

  fetchPhotosByStyle = async (productId, styleId) => {
    const response = await fetch(`/photos/${productId}/${styleId}`);
    const data = await response.json();
    this.setState({
      photos: data,
    });
  }

  render() {
    const { showCarousel, photos } = this.state;
    return (
      <>
        {showCarousel
          ? <Carousel photos={photos} />
          : <Gallery photos={photos} />}
      </>
    );
  }
}

export default PhotoModule;
