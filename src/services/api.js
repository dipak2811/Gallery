import axios from "axios";

const BASE_URL = "http://localhost:5000"; 

const api = axios.create({
  baseURL: BASE_URL,
});

export const uploadImage = async (formData) => {
  try {
    const response = await api.post("/images/upload", formData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
};

export const getImages = async () => {
  try {
    const response = await api.get("/images");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch images");
  }
};

export const createAlbum = async (albumData) => {
  try {
    const response = await api.post("/albums/create", albumData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create album");
  }
};

export const getAlbums = async () => {
  try {
    const response = await api.get("/albums");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch albums");
  }
};

export const addImageToAlbum = async (albumId, imageId) => {
  try {
    const response = await api.post(`/albums/${albumId}/add/${imageId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add image to album");
  }
};

export const getImagesInAlbum = async (albumId) => {
  try {
    const response = await api.get(`/albums/${albumId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch images in the album");
  }
};

export const addImageLike = async (imageId) => {
  try {
    const response = await api.put(`/images/${imageId}/like`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to like image");
  }
};

export const addCommentToImage = async (imageId, comment) => {
  try {
    const response = await api.post(`/images/${imageId}/comment`,comment);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add image to album");
  }
};

// Add more API calls as needed for filtering, searching, etc.
