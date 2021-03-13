import axios from "axios";

// const url = "http://localhost:5000";
// const url = "https://post-app-backend.herokuapp.com";
const url = "";

axios.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => axios.get(`${url}/posts`);
export const createPost = (newPost) => axios.post(`${url}/posts`, newPost);

export const updatePost = (id, post) => {
  return axios.patch(`${url}/posts/${id}`, post);
};

export const deletePost = (id) => {
  return axios.delete(`${url}/posts/${id}`);
};

export const likePost = (id) => {
  return axios.patch(`${url}/posts/${id}/likePost`);
};

export const signIn = (formData) => {
  return axios.post(`${url}/user/signin`, formData);
};
export const signUp = (formData) => {
  return axios.post(`${url}/user/signup`, formData);
};
