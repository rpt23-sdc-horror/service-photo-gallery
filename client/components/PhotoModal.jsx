import React from "react";
import PhotoCard from "./PhotoCard.jsx";

const PhotoModal = ({ active, photos }) => {
  if (active) {
    window.scrollTo({
      top: 500,
      behavior: 'smooth'
    });
  }

  // const photosList = photos.map((photo, index) => {
  //   return <img src={photo} key={index}/>;
  // });

  const photosList = photos.map((photo, index) =>
  <PhotoCard url={photo} key={index} index={index} />
);

  return (
    <div id="photo-modal" className={active ? "active" : "hidden"}>
      {photosList}
    </div>
  )
}

export default PhotoModal;