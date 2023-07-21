import React, { useEffect, useState } from "react";
import { getImages } from "../services/api";
import ImageCard from "./ImageCard";
import FilterBar from "./FilterBar";
import { ToastContainer, toast } from "react-toastify";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchImage, setSearchImage] = useState([]);
  let debounceTimeout;

  useEffect(() => {
    fetchImages();
  }, []);
  console.log(images);

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchKeyword]);

  const handleSearch = async () => {
    try {
      const filteredImages = images.filter((image) =>
        image.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setSearchImage(filteredImages);
    } catch (error) {
      toast.error("Failed to perform the search", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handleClearSearch = () => {
    setSearchKeyword("");
    setSearchImage([]);
  };

  const fetchImages = async () => {
    try {
      const imagesData = await getImages();
      setImages(imagesData);
    } catch (error) {
      toast.error("Failed to fetch images", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div>
      <h2 className="mb-4">Image Gallery</h2>
      <div className="row mb-4">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search images..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          {searchKeyword && (
            <button
              className="btn btn-secondary mt-2"
              onClick={handleClearSearch}
            >
              Clear Search
            </button>
          )}
        </div>
        <div className="col-md-4">
          <FilterBar />
        </div>
      </div>
      <div className="row">
        {searchKeyword
          ? searchImage.map((image) => (
              <div key={image._id} className="col-md-3 col-sm-6 col-12 mb-3">
                <ImageCard image={image} />
              </div>
            ))
          : images.map((image) => (
              <div key={image._id} className="col-md-3 col-sm-6 col-12 mb-3">
                <ImageCard image={image} />
              </div>
            ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ImageGallery;
