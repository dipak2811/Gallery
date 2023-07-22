import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getImagesInAlbum } from "../services/api";
import { ToastContainer, toast } from "react-toastify";

const AlbumPicture = () => {
  const { albumId } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImagesInAlbum();
  }, [albumId]);

  const fetchImagesInAlbum = async () => {
    try {
      const albumData = await getImagesInAlbum(albumId);
      console.log("albumData",albumData);
      setImages(albumData.images);
    } catch (error) {
      toast.error("Failed to fetch images in the album", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handleRemove = () => {};

  return (
    <div>
      <div className="container mt-4">
        <h2>Album Pictures</h2>
        <div className="col-md-6">
          <div className="row">
            {images.map((image) => (
              <div key={image._id} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    className="card-img-top"
                    src={image.imageUrl}
                    alt={image.title}
                  />
                </div>
                <button className="btn btn-primary mt-3" onClick={handleRemove}>
                  Remove From Album
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AlbumPicture;
