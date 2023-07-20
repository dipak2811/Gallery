import React, { useState, useEffect } from "react";
import { addImageToAlbum, getAlbums } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ImageCard = ({ image }) => {
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const albumsData = await getAlbums();
      setAlbums(albumsData);
    } catch (error) {
      toast.error("Failed to fetch albums", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handleAlbumChange = (e) => {
    setSelectedAlbum(e.target.value);
  };

  const handleAddToAlbum = async () => {
    try {
      if (!selectedAlbum) {
        toast.error("Please select an album to add the image", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
        return;
      }

      await addImageToAlbum(selectedAlbum, image._id);
      toast.success("Image added to album successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Failed to add image to album", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="card ">
      <img className="card-img-top" src={image.imageUrl} alt={image.title} />
      <div className="card-body">
        <h5 className="card-title">{image.title}</h5>
        <div className="form-group">
          <select
            className="form-control"
            value={selectedAlbum}
            onChange={handleAlbumChange}
          >
            <option value="">Select Album</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleAddToAlbum}>
          Add to Album
        </button>
      </div>
      {/* React Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default ImageCard;
