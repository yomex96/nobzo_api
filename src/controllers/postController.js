import Post from "../models/Post.js";
import { generateSlug } from "../utils/generateSlug.js";

export const createPost = async (req, res) => {
  const post = await Post.create({
    ...req.body,
    slug: generateSlug(req.body.title),
    author: req.user.id
  });

  res.status(201).json(post);
};

export const getPosts = async (req, res) => {
  const { page = 1, limit = 10, search, tag, author, status } = req.query;

  let filter = { deletedAt: null };

  if (!req.user) filter.status = "published";
  if (search)
    filter.$or = [
      { title: new RegExp(search, "i") },
      { content: new RegExp(search, "i") }
    ];
  if (tag) filter.tags = tag;
  if (author) filter.author = author;
  if (status && req.user) filter.status = status;

  const posts = await Post.find(filter)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .populate("author", "name");

  res.json(posts);
};

export const getSingle = async (req, res) => {
  const post = await Post.findOne({
    slug: req.params.slug,
    status: "published",
    deletedAt: null
  });

  if (!post)
    return res.status(404).json({ message: "Not found" });

  res.json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  Object.assign(post, req.body);
  await post.save();

  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.author.toString() !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  post.deletedAt = new Date();
  await post.save();

  res.json({ message: "Deleted" });
};
