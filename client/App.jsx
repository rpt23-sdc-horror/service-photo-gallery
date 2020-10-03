import React from 'react';
import Photo from './components/Photo.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    };
  }

  // The productId and the currently selected styleId should be passed down through props
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (this.props.styleId !== prevProps.styleId) {
      this.fetchPhotosByStyle(this.props.productId, this.props.styleId);
    }
  }

  // componentDidMount() {
  //   this.getPhotosByStyle(1, '001');
  // }

  fetchPhotosByStyle = async (productId, styleId) => {
    const response = await fetch(`/photos/${productId}/${styleId}`);
    const data = await response.json();
    this.setState({
      photos: data,
    });
  }

  render() {
    const photosList = this.state.photos.map((photo, index) =>
      <Photo url={photo} key={index} />
    );

    return (
      <div id="gallery-large">
        {photosList}
      </div>
    );
  }
}

export default App;
