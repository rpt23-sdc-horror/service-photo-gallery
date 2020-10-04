import React from 'react';
import PhotoCard from './components/PhotoCard.jsx';
import PhotoModal from "./components/PhotoModal.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      modalActive: false,
    };
  }

  // The productId and the currently selected styleId should be passed down through props
  componentDidUpdate(prevProps) {
    if (this.props.styleId !== prevProps.styleId) {
      console.log('styleId changed! New ID: ', this.props.styleId);
      this.fetchPhotosByStyle(this.props.productId, this.props.styleId);
    }
  }

  fetchPhotosByStyle = async (productId, styleId) => {
    const response = await fetch(`/photos/${productId}/${styleId}`);
    const data = await response.json();
    this.setState({
      photos: data,
    });
  }

  clickPhotoOpen = (e) => {
    console.log('photo clicked');
    const photoIndex = +e.target.dataset.index;
    const modalPhotoHeight = window.innerWidth * 1.25 + 8;
    this.setState({
      modalActive: true,
      modalScroll: modalPhotoHeight * photoIndex,
    })
  }

  render() {
    const photosList = this.state.photos.map((photo, index) =>
      <PhotoCard url={photo} key={index} index={index} clickPhotoOpen={this.clickPhotoOpen} />
    );

    return (
      <div id="photo-gallery">
        <PhotoModal active={this.state.modalActive} photos={this.state.photos} scroll={this.state.modalScroll}/>
        <div id="gallery-large">
          {photosList}
        </div>
      </div>
    );
  }
}

export default App;
