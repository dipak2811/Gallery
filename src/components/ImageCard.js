import React, { useState, useEffect } from "react";
import { addImageToAlbum, getAlbums, addImageLike, addCommentToImage } from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faCloudArrowDown, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Button, Form } from "react-bootstrap";

const ImageCard = ({ image }) => {
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [albums, setAlbums] = useState([]);
  const [comment, setComment] = useState("");
  const [comments,setComments] = useState([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [like,setLike] = useState(false);

  useEffect(() => {
    fetchAlbums();
    setLike(image.like);
    setComments(image.comments);
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
    setShowAlbumModal(false);

  };

  const handleLike = async () => {
    try {
      await addImageLike(image._id);
      setLike((like)=>!like);
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
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = image.title; // Set the image title as the file name
      link.target = "_blank"; // Open in a new tab, so it won't redirect the current page

      link.click(); // Simulate a click on the download link

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
      <div className="card" style={{ height: '270px' }}>
        <div className="d-flex align-items-center" style={{ height: '150px'}} >
          <img
            src={image.imageUrl} alt={image.title}
            className="card-img-top"
            style={{  objectFit: 'contain', height: '100%' }}
          />
        </div>
        <div className="card-body h-25">
          <h5 className="card-title">{image.title}</h5>
          <div className="mt-3">
            <button className="btn border-0 px-2 w-25" onClick={handleLike}>
              {like ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-2x"
                  style={{ color: "red" }}
                />
              ) : (
                <FontAwesomeIcon icon={farHeart} className="fa-2x" />
              )}
            </button>
            <button className="btn border-0 px-2 w-25" onClick={() => setShowCommentModal(true)}>
              <FontAwesomeIcon icon={faComment} className="fa-2x" />
            </button>
            <button className="btn border-0 px-2 w-25" onClick={handleDownload}>
              <FontAwesomeIcon icon={faCloudArrowDown} className="fa-2x" />
            </button>
            <button className="btn border-0 px-2 w-25" onClick={() => setShowAlbumModal(true)}>
              <FontAwesomeIcon icon={faFolderPlus} className="fa-2x" />
            </button>
          </div>
          <div className="mt-3">
            <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
                <input
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Enter your comment..."
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleAddComment}>
                  Add Comment
                </Button>
                <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          {/* <div className="mt-3">
           <input
             type="text"
             value={tags.join(", ")}
             onChange={handleTagChange}
             placeholder="Enter tags (comma-separated)..."
           />
           <button className="btn btn-primary" onClick={handleAddTags}>
             Add Tags
           </button>
         </div> */}
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
                {albums.map((album) => (
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
            <Button variant="secondary" onClick={() => setShowAlbumModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>


    // <div className="card">
    //   <img className="card-img-top" src={image.imageUrl} alt={image.title} />
    //   <div className="card-body">
    //     <h5 className="card-title">{image.title}</h5>
    //     <div className="mt-3">
    //       <button className="btn border-0 px-2" onClick={handleLike}>
    //         {image.like ? (
    //           <FontAwesomeIcon
    //             icon={faHeart}
    //             className="fa-2x"
    //             style={{ color: "red" }}
    //           />
    //         ) : (
    //           <FontAwesomeIcon icon={farHeart} className="fa-2x" />
    //         )}
    //       </button>
    //       <button className="btn border-0 px-2" onClick={() => setShowCommentModal(true)}>
    //         <FontAwesomeIcon icon={faComment} className="fa-2x" />
    //       </button>
    //       <button className="btn border-0 px-2" onClick={handleDownload}>
    //         <FontAwesomeIcon icon={faCloudArrowDown} className="fa-2x" />
    //       </button>
    //       <button className="btn border-0 px-2" onClick={() => setShowAlbumModal(true)}>
    //         <FontAwesomeIcon icon={faFolderPlus} className="fa-2x" />
    //       </button>
    //     </div>
    //     <div className="mt-3">
    //       <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
    //         <Modal.Header closeButton>
    //           <Modal.Title>Comments</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>
    //           <ul>
    //             {image.comments.map((comment, index) => (
    //               <li key={index}>{comment}</li>
    //             ))}
    //           </ul>
    //           <input
    //             type="text"
    //             value={comment}
    //             onChange={handleCommentChange}
    //             placeholder="Enter your comment..."
    //           />
    //         </Modal.Body>
    //         <Modal.Footer>
    //           <Button variant="primary" onClick={handleAddComment}>
    //             Add Comment
    //           </Button>
    //           <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
    //             Close
    //           </Button>
    //         </Modal.Footer>
    //       </Modal>
    //     </div>
    //     {/* <div className="mt-3">
    //       <input
    //         type="text"
    //         value={tags.join(", ")}
    //         onChange={handleTagChange}
    //         placeholder="Enter tags (comma-separated)..."
    //       />
    //       <button className="btn btn-primary" onClick={handleAddTags}>
    //         Add Tags
    //       </button>
    //     </div> */}
    //   </div>
    //   <ToastContainer />
    //   <Modal show={showAlbumModal} onHide={() => setShowAlbumModal(false)}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Add to Album</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <div className="form-group">
    //         <select
    //           className="form-control"
    //           value={selectedAlbum}
    //           onChange={handleAlbumChange}
    //         >
    //           <option value="">Select Album</option>
    //           {albums.map((album) => (
    //             <option key={album._id} value={album._id}>
    //               {album.title}
    //             </option>
    //           ))}
    //         </select>
    //       </div>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="primary" onClick={handleAddToAlbum}>
    //         Add to Album
    //       </Button>
    //       <Button variant="secondary" onClick={() => setShowAlbumModal(false)}>
    //         Close
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </div>
  );
};

export default ImageCard;
