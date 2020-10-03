import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
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
      photos: data
    })
  }

  render() {
    return (
      <div>WTF</div>
    );
  }
}

export default App;
