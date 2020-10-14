/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
    const productId = ids[2];
    const styleId = `00${ids[3]}`;
    this.fetchPhotosByStyle(productId, styleId);
    window.addEventListener('resize', this.handleResize);

    // test function to test changing the url
    // setInterval(() => {
    //   const productId = Math.ceil(Math.random() * 100);
    //   const styleId = Math.ceil(Math.random() * 3);
    //   this.props.history.push(`/shop/${productId}/${styleId}`);
    // }, 3000);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      console.log('url changed:', location);
      const ids = location.pathname.split('/');
      const productId = ids[2];
      const styleId = `00${ids[3]}`;
      this.fetchPhotosByStyle(productId, styleId);
    }
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
    const response = await fetch(`http://localhost:3000/photos/${productId}/${styleId}`);
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

PhotoModule.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
  }).isRequired,
};

export default withRouter(PhotoModule);
