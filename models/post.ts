import mongoose, { Schema, Document, Model } from "mongoose";

interface PostDocument extends Document {
  title: string;
  slug: string;
  description: string;
  image: string;
  user: mongoose.Schema.Types.ObjectId;
}

const postSchema = new mongoose.Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
