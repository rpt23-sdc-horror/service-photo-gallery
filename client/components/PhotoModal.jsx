import React from "react";
import PhotoCard from "./PhotoCard.jsx";

class PhotoModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    window.scrollTo({
      top: this.props.scroll,
      behavior: 'auto'
    });
  }

  closeModal = () => {
    console.log('x closed clicked');
  }

  // const photosList = photos.map((photo, index) => {
  //   return <img src={photo} key={index}/>;
  // });

  render() {
    const photosList = this.props.photos.map((photo, index) =>
    <PhotoCard url={photo} key={index} index={index} />
  );

    return (
      <div id="photo-modal" className={this.props.active ? "active" : "hidden"}>
        <button id="close-btn" onClick={this.closeModal}>x</button>
        {photosList}
      </div>
    )
  }
}

export default PhotoModal;