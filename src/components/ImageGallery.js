import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GeneralGallery from "./GeneralGallery";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  const store = useSelector((state) => state.ImageStore);
  useEffect(() => {
    setImages(store.images);
  }, [store]);


  return (
    <div>
      <h2 className="mb-4">Image Gallery</h2>
      <GeneralGallery imageProps={images} />
    </div>
  );
};

export default ImageGallery;
