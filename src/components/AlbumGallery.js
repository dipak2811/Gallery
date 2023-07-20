import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAlbums } from "../services/api";
import AlbumCard from "./AlbumCard";
import { ToastContainer, toast } from "react-toastify";


const AlbumGallery = () => {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

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
            <AlbumCard album={album} />
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AlbumGallery;
