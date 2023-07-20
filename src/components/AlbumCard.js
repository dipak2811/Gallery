import React from "react";

const AlbumCard = ({ album }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{album.title}</h5>
      </div>
    </div>
  );
};

export default AlbumCard;
