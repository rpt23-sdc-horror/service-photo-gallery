import React from 'react';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      photos: [],
    };
  }

  componentDidMount = () => {
    this.getPhotosByStyle(1, '001');
  }

  getPhotosByStyle = async (productId, styleId) => {
    const response = await fetch(`/photos/${productId}/${styleId}`);
    const data = await response.json();
    this.setState({
      photos: data,
    });
  }

  render() {
    const photosList = this.state.photos.map((photo) => <div><img src={photo} /></div>);
    return (
      <div id="gallery-large">
        {photosList}
      </div>
    );
  }
}

export default App;
