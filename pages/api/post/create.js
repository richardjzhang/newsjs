// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { unstable_getServerSession } from "next-auth/next";
import nc from "next-connect";
import multer from "multer";
const cloudinary = require("cloudinary").v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import slugify from "slugify";
import { authOptions } from "api/auth/[...nextauth]";
import { errorHandler, responseHandler, validateAllOnce } from "utils/common";
import Post from "models/post";
import dbConnect from "lib/db-connect";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER,
  },
});

const upload = multer({ storage });

const handler = nc({
  onError(error, _, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
})
  .use(upload.single("image"))
  .post(async (req, res) => {
    try {
      const session = await unstable_getServerSession(req, res, authOptions);

      if (session) {
        const { title, description } = req.body;
        validateAllOnce({ title, description });

        if (!req.file) {
          errorHandler("Image is required", res);
          return;
        }

        const uploadUrl = req.file.path;

        await dbConnect();
        const userId = session.user.id;
        const slug = slugify(`${new Date()}-${title}`, {
          remove: /[*+~.()'"!:@]/g,
        });
        const post = new Post({
          title,
          description,
          slug,
          image: uploadUrl,
          user: userId,
        });
        const savePost = await post.save();

        if (savePost) {
          responseHandler(savePost, res, 201);
        } else {
          errorHandler(savePost, res);
        }
      } else {
        errorHandler("Access denied", res);
        return;
      }
    } catch (error) {
      let message = "Unknown error";
      if (error instanceof Error) {
        errorHandler(error.message, res);
        return;
      }
      if (typeof error === "string") {
        errorHandler(error, res);
        return;
      }
      errorHandler(message, res);
    }
  });

export default handler;
