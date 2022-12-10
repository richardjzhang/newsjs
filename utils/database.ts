import dbConnect from "lib/db-connect";
import PostModel from "models/post";

export const fetchAllPosts = async () => {
  await dbConnect();
  const posts = await PostModel.find({}).exec();
  return JSON.parse(JSON.stringify(posts));
};

export const fetchPost = async (id: string) => {
  await dbConnect();
  const post = await PostModel.findOne({ _id: id })
    .select("_id title description slug image createdAt")
    .exec();
  return JSON.parse(JSON.stringify(post));
};
