import React, { useState, useEffect } from "react";
import { addImageToAlbum, getAlbums } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ImageCard = ({ image }) => {
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [albums, setAlbums] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState([]);

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

  const handleLike = () => {
    // Placeholder function for handling like
    setLiked(!liked);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    // Placeholder function for adding a comment
    console.log("Comment:", comment);
    setComment("");
  };

  const handleTagChange = (e) => {
    // Placeholder function for handling tag input change
    const value = e.target.value;
    const tagsArray = value.split(",").map((tag) => tag.trim());
    setTags(tagsArray);
  };

  const handleAddTags = () => {
    // Placeholder function for adding tags
    console.log("Tags:", tags);
  };

  const handleDownload = async () => {
    try {
      const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
      const imageUrl = `${corsProxyUrl}${image.imageUrl}`;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = image.title;
      link.target = "_blank";
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast.error("Failed to download image", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };
  

  return (
    <div className="card">
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

        {/* Like Section */}
        <div className="mt-3">
          <button
            className={`btn ${liked ? "btn-danger" : "btn-secondary"}`}
            onClick={handleLike}
          >
            {liked ? "Unlike" : "Like"}
          </button>
        </div>

        {/* Comment Section */}
        <div className="mt-3">
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Enter your comment..."
          />
          <button className="btn btn-primary" onClick={handleAddComment}>
            Add Comment
          </button>
        </div>

        {/* Tag Section */}
        <div className="mt-3">
          <input
            type="text"
            value={tags.join(", ")}
            onChange={handleTagChange}
            placeholder="Enter tags (comma-separated)..."
          />
          <button className="btn btn-primary" onClick={handleAddTags}>
            Add Tags
          </button>
        </div>

        {/* Download Button */}
        <button className="btn btn-primary mt-3" onClick={handleDownload}>
          Download
        </button>
      </div>
      {/* React Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default ImageCard;
