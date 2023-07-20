import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faCloudArrowUp,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImage } from "../services/api";
import { createAlbum } from "../services/api";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [albumData, setAlbumData] = useState({
    title: "",
    // Add more fields as needed for the album form
  });
  const navigate = useNavigate();

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
    setShowCreateModal(false);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      setTitle("");
      setImage(null);
      handleCloseModal();
      await uploadImage(formData);
      toast.success("Image uploaded successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Failed to upload image", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handleAlbumChange = (e) => {
    const { name, value } = e.target;
    setAlbumData({ ...albumData, [name]: value });
  };

  const handleAlbumSubmit = async () => {
    handleCloseModal();
    try {
      await createAlbum(albumData);
      toast.success("Album created successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Failed to create album", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <span className="navbar-brand" role="button" onClick={navigateHome}>
          <FontAwesomeIcon icon={faImages} /> Gallery
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse  justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <div
                className="nav-link active"
                role="button"
                onClick={handleUploadClick}
              >
                Upload <FontAwesomeIcon icon={faCloudArrowUp} />
              </div>
            </li>
            <li className="nav-item">
              <div
                className="nav-link"
                role="button"
                onClick={handleCreateClick}
              >
                Create <FontAwesomeIcon icon={faFolderPlus} />
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link" role="button">
                User
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal show={showUploadModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="card">
            <div className="card-body">
              <div>
                <label className="mb-3 fw-bold">Enter Image Name</label>
                <input
                  type="input"
                  className="form-control mb-3"
                  onChange={handleTitleChange}
                  placeholder="Image Title"
                />
              </div>
              <div>
                <label className="mb-3 fw-bold">Upload Image</label>
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Album</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="card">
            <div className="card-body">
              <div>
                <label className="mb-3 fw-bold">Enter Album Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  name="title"
                  placeholder="Album Title"
                  value={albumData.title}
                  onChange={handleAlbumChange}
                />
                {/* Add other form fields for the album data */}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAlbumSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </nav>
  );
}

export default Navbar;
