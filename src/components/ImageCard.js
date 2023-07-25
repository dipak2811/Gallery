import React, { useState, useEffect } from "react";
import {
  addImageToAlbum,
  addImageLike,
  addCommentToImage,
  deleteImage,
} from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCloudArrowDown,
  faFolderPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addImage } from "../Redux/Slices/ImageReducerSlice";

const ImageCard = ({ image }) => {
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [like, setLike] = useState(false);
  const store = useSelector((state) => state.ImageStore);
  const albumStoreData = useSelector((state) => state.AlbumStore);
  const dispatch = useDispatch();

  useEffect(() => {
    setLike(image.like);
    setComments(image.comments);
  }, []);

  useEffect(() => {
    let filteredTOAdd = store.images.map((img) => {
      if (img?._id !== image?._id) {
        return img;
      }
      return { ...image, like: like, comments: comments };
    });
    dispatch(addImage([...filteredTOAdd]));
  }, [like, comments]);

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
    setShowAlbumModal(false);
  };

  const handleLike = async () => {
    try {
      await addImageLike(image._id);
      setLike((like) => !like);
    } catch (error) {
      toast.error("Failed to like image", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handleDeleteImage = async () => {
    try {
      await deleteImage(image._id);
      let filteredTOAdd = store.images.filter((img) => img?._id !== image?._id);
      dispatch(addImage([...filteredTOAdd]));
    } catch (error) {
      toast.error("Failed to like image", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      await addCommentToImage(image._id, { comment });
      setComments([...comments, comment]);
      setComment("");
    } catch (error) {
      toast.error("Failed to add comment", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
    setShowCommentModal(false);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(image.imageUrl);
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
    <>
      <div className="card" style={{ height: "270px" }}>
        <div className="d-flex align-items-center" style={{ height: "150px" }}>
          <img
            src={image.imageUrl}
            alt={image.title}
            className="card-img-top"
            style={{ objectFit: "contain", height: "100%" }}
          />
        </div>
        <div className="card-body h-25">
          <h5 className="card-title">{image.title}</h5>
          <div className="mt-3 d-flex flex-wrap justify-content-between">
            <button className="btn border-0 px-2" onClick={handleLike}>
              {like ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-lg"
                  style={{ color: "red" }}
                />
              ) : (
                <FontAwesomeIcon icon={farHeart} className="fa-lg" />
              )}
            </button>
            <button
              className="btn border-0 px-2"
              onClick={() => setShowCommentModal(true)}
            >
              <FontAwesomeIcon icon={faComment} className="fa-lg" />
            </button>
            <button className="btn border-0 px-2" onClick={handleDownload}>
              <FontAwesomeIcon icon={faCloudArrowDown} className="fa-lg" />
            </button>
            <button
              className="btn border-0 px-2"
              onClick={() => setShowAlbumModal(true)}
            >
              <FontAwesomeIcon icon={faFolderPlus} className="fa-lg" />
            </button>
            <button className="btn border-0 px-2" onClick={handleDeleteImage}>
              <FontAwesomeIcon icon={faTrashCan} className="fa-lg" />
            </button>
          </div>
          <div className="mt-3">
            <Modal
              show={showCommentModal}
              onHide={() => setShowCommentModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul>
                  {comments?.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Enter your comment..."
                  className="w-75 p-1 rounded-2"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleAddComment}>
                  Add Comment
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowCommentModal(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <ToastContainer />
        <Modal show={showAlbumModal} onHide={() => setShowAlbumModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add to Album</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <select
                className="form-control"
                value={selectedAlbum}
                onChange={handleAlbumChange}
              >
                <option value="">Select Album</option>
                {albumStoreData.albums?.map((album) => (
                  <option key={album._id} value={album._id}>
                    {album.title}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAddToAlbum}>
              Add to Album
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowAlbumModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ImageCard;
