import React from "react";

const PhotoModal = ({ active, photos }) => {
  const photosList = photos.map((photo) => {
    return <img src={photo} />;
  })
  return (
    <div id="photo-modal" className={active ? "active" : "hidden"}>
      {photosList}
    </div>
  )
}

export default PhotoModal;