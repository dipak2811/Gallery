import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import { ToastContainer, toast } from "react-toastify";

const GeneralGallery = ({imageProps}) => {
  const [images, setImages] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredImage, setFilteredImage] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchFileredImage, setSearchFileredImage] = useState([]);
  let debounceTimeout;

  useEffect(() => {
    setImages(imageProps);
  }, [imageProps]);

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchKeyword]);
  useEffect(() => {
    filterImages();
  }, [selectedFilter]);

  const handleSearch = async () => {
    try {
      let filtered;
      if (searchKeyword === "" && selectedFilter) {
        setFilteredImage([...searchFileredImage]);
      } else if (selectedFilter !== "") {
        filtered = filteredImage.filter((image) =>
          image.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setFilteredImage([...filtered]);
      } else if (searchKeyword !== "") {
        filtered = images.filter((image) =>
          image.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
        setFilteredImage([...filtered]);
      }
    } catch (error) {
      toast.error("Failed to perform the search", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handleClearSearch = () => {
    setSelectedFilter("");
    setSearchKeyword("");
    setFilteredImage([]);
  };

  const handleFilter = (e) => {
    setSelectedFilter(e.target.value);
  };
  const filterImages = () => {
    let filtered = searchKeyword !== "" ? [...filteredImage] : [...images];
    if (selectedFilter === "like") {
      const likedimages = filtered.filter((image) => image.like);
      const remaining = filtered.filter((image) => !image.like);
      filtered = [].concat(likedimages, remaining);
      setFilteredImage([...filtered]);
    }
    if (selectedFilter === "latest") {
      filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      setFilteredImage([...filtered]);
    }
    setSearchFileredImage([...filtered]);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control mt-1"
            placeholder="Search images..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className="col-md-4 d-flex justify-content-end mt-1">
          <select
            className="form-select form-select-sm"
            aria-label=".form-select-sm example"
            onChange={handleFilter}
            value={selectedFilter}
          >
            <option defaultValue="" value="">
              Select
            </option>
            <option value="like">Liked Images First</option>
            <option value="latest">Latest Images First</option>
          </select>
        </div>
      </div>
      <div className="row mb-2">
        {(searchKeyword || filteredImage.length > 0) && (
          <button
            className="btn btn-primary mt-2"
            style={{maxWidth:"130px",marginLeft:"12px"}}
            onClick={handleClearSearch}
          >
            Clear Search
          </button>
        )}
      </div>
      <div className="row">
        {searchKeyword || filteredImage.length > 0
          ? filteredImage?.map((image) => (
              <div key={image._id} className="col-md-3 col-sm-6 col-12 mb-3">
                <ImageCard image={image} />
              </div>
            ))
          : images?.map((image) => (
              <div key={image._id} className="col-md-3 col-sm-6 col-12 mb-3">
                <ImageCard image={image} />
              </div>
            ))}
      </div>

      <ToastContainer />
    </div>
  );
};

export default GeneralGallery;
