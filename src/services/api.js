import axios from "axios";
import { getCookie } from "react-use-cookie";

const token = getCookie("token");
const userCookie = getCookie("user");
let User;
if (userCookie) {
  User = JSON.parse(userCookie);
}
const UserId = User?.id;

const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
});
api.defaults.headers.common["Authorization"] = `${token}`;
api.defaults.headers.post["Content-Type"] = "application/json";
export const uploadImage = async (formData) => {
  try {
    const response = await api.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
    const response = await api.post(`/albums/${UserId}/create`, albumData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create album");
  }
};

export const getAlbums = async () => {
  try {
    const response = await api.get(`/albums/${UserId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch albums");
  }
};

export const addImageToAlbum = async (albumId, imageId) => {
  try {
    const response = await api.put(`/albums/${albumId}/addImage/${imageId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add image to album");
  }
};

export const getImagesInAlbum = async (albumId) => {
  try {
    const response = await api.get(`/albums/album/${albumId}`);
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
    const response = await api.post(`/images/${imageId}/comment`, comment);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add image to album");
  }
};

export const loginUser = async (user) => {
  try {
    const response = await api.post(`/users/login`, user);
    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const registerUser = async (user) => {
  try {
    const response = await api.post(`/users/register`, user);
    return response.data;
  } catch (error) {
    throw new Error("Failed to register");
  }
};
