import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createPost,
  getPosts,
  getSingle,
  updatePost,
  deletePost
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getPosts);
router.get("/:slug", getSingle);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
