// This file is ONLY used when launching the Photo Gallery independently. It creates the larger app context needed to pass down productId/styleId props to the Photo component

import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js/stable';

import '../index.css';
import App from "../App.jsx";

class DevApp extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: null,
      styleId: null
    }
  }

  changeStyle = () => {
    let newStyleId = Number(this.state.styleId) + 1;
    if (newStyleId > 3) {
      newStyleId = 1;
    }

    this.setState({
      productId: Math.ceil(Math.random() * 100),
      styleId: '00' + newStyleId
    })
  }

  render() {
    return (
      <div style={{maxWidth: "984px"}}>
        <h1>Hugo's Photo Gallery</h1>
        <button onClick={this.changeStyle}>Change style</button>
        <h3>Gallery:</h3>
        <App productId={this.state.productId} styleId={this.state.styleId} />
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <DevApp />
  </React.StrictMode>,
  document.getElementById('app'),
);
