import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getImagesInAlbum } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import GeneralGallery from "./GeneralGallery";

const AlbumPicture = () => {
  const [images, setImages] = useState([]);
  const { albumId } = useParams();
  useEffect(() => {
    fetchImagesInAlbum();
  }, [albumId]);


  const fetchImagesInAlbum = async () => {
    try {
      const albumData = await getImagesInAlbum(albumId);
      setImages(albumData.images);
    } catch (error) {
      toast.error("Failed to fetch images in the album", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h2>Album Pictures</h2>
        <GeneralGallery imageProps={images} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AlbumPicture;
