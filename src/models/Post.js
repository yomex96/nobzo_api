import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft"
    },
    tags: [String],
    deletedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
