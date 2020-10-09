import React from 'react';
import PhotoCard from './components/PhotoCard.jsx';
import PhotoModal from './components/PhotoModal.jsx';
import PhotoCarousel from './components/PhotoCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      modalShow: false,
      modalScroll: 0,
    };
  }

  // The productId and the currently selected styleId should be passed down through props
  componentDidMount() {
    const { pathname } = window.location;
    const productId = pathname[1];
    const styleId = pathname.slice(3, 6);
    this.fetchPhotosByStyle(productId, styleId);
  }

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
    const photosList = this.state.photos.map((photo, index) => (
      <PhotoCard
        url={photo}
        key={index}
        index={index}
        clickPhotoOpen={this.clickPhotoOpen}
      />
    ));

    const { modalShow, photos, modalScroll } = this.state;

    return (
      <div id="photo-gallery">
        <PhotoModal
          show={modalShow}
          photos={photos}
          scroll={modalScroll}
          hide={this.hideModal}
        />
        <div id="gallery">
          {photosList}
        </div>
        <PhotoCarousel photos={photos} />
      </div>
    );
  }
}

export default App;
