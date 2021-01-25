import axios from "axios";

const url = "http://localhost:5000/posts";
// const url = "https://posts-app-backend.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, post) => {
  return axios.patch(`${url}/${id}`, post);
};

export const deletePost = (id) => {
  return axios.delete(`${url}/${id}`);
};

export const likePost = (id) => {
  return axios.patch(`${url}/${id}/likePost`);
};
