/* eslint-disable react/no-array-index-key */
import React from 'react';
import Card from './components/Card.jsx';
import GalleryModal from './components/GalleryModal.jsx';
import Carousel from './components/Carousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      modalShow: false,
      carouselShow: window.innerWidth < 640 === true,
      modalScroll: 0,
    };
  }

  componentDidMount() {
    const { pathname } = window.location;
    const productId = pathname[1];
    const styleId = pathname.slice(3, 6);
    this.fetchPhotosByStyle(productId, styleId);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const carouselShow = window.innerWidth < 640 === true;
    this.setState({
      carouselShow,
    });
  };

  fetchPhotosByStyle = async (productId, styleId) => {
    const response = await fetch(`/photos/${productId}/${styleId}`);
    const data = await response.json();
    this.setState({
      photos: data,
    });
  }

  clickPhotoOpen = (e) => {
    const photoIndex = +e.target.dataset.index;
    const modalPhotoHeight = window.innerWidth * 1.25 + 8;
    this.setState({
      modalShow: true,
      modalScroll: modalPhotoHeight * photoIndex,
    });
  }

  hideModal = () => {
    this.setState({
      modalShow: false,
      modalScroll: 0,
    });
  }

  render() {
    const {
      carouselShow, modalShow, photos, modalScroll,
    } = this.state;

    const photosList = photos.map((photo, index) => (
      <Card
        url={photo}
        key={index}
        index={index}
        clickPhotoOpen={this.clickPhotoOpen}
      />
    ));

    return (
      <>
        <GalleryModal
          show={modalShow}
          photos={photos}
          scroll={modalScroll}
          hide={this.hideModal}
        />
        {carouselShow
          ? <Carousel photos={photos} />
          : (
            <div id="gallery">
              {photosList}
            </div>
          )}
      </>
    );
  }
}

export default App;
