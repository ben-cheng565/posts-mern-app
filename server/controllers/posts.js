import mongoose from "mongoose";

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const newPost = new PostMessage(req.body);
  try {
    const result = await newPost.save();

    res.status(201).json(result);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = { ...req.body, id };

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found.");
  try {
    const result = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found.");

  try {
    await PostMessage.findByIdAndDelete(id);
    res.status(200).send("Post deleted successfully.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated." });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found.");

  try {
    const post = await PostMessage.findById(id);

    //check if an user has already liked the post
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const result = await PostMessage.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
