import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }

  async getPhotos(styleId) {
    const response = await fetch(`/photos/${styleId}`);
  }

  render() {
    return (
      <div>WTF</div>
    );
  }
}

export default App;
