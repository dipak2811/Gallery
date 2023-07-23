import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AlbumGallery = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
  const store = useSelector((state) => state.AlbumStore);

  useEffect(() => {
    setAlbums(store.albums);
  }, [store]);

  return (
    <div>
      <h2 className="mb-4">Album Gallery</h2>
      <div className="row">
        {albums.map((album) => (
          <div
            key={album._id}
            className="col-md-3 col-sm-6 col-12  mb-3"
            role="button"
            onClick={() => {
              navigate(`/albums/${album._id}`);
            }}
          >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{album.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumGallery;
