// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongoose";
import nc from "next-connect";
import { unstable_getServerSession } from "next-auth/next";
import slugify from "slugify";
import { authOptions } from "api/auth/[...nextauth]";
import * as path from "path";
import { Request } from "express";
import multer from "multer";
import { errorHandler, responseHandler, validateAllOnce } from "utils/common";
import Post from "models/post";
import User from "models/user";
import dbConnect from "lib/db-connect";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback
    ) {
      cb(null, path.join(process.cwd(), "public", "uploads"));
    },
    filename: function (_, file: Express.Multer.File, cb: FileNameCallback) {
      cb(null, `${new Date().getTime()}-${file.originalname}`);
    },
  }),
});

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err: any, _, res: NextApiResponse) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (_, res: NextApiResponse) => {
    res.status(404).end("Page is not found");
  },
})
  .use(upload.single("image"))
  .post(async (req: Request, res: NextApiResponse) => {
    try {
      const session = await unstable_getServerSession(req, res, authOptions);
      if (session) {
        const { title, description } = req.body;
        validateAllOnce({ title, description });

        if (!req.file) {
          errorHandler("Image is required", res);
          return;
        }

        await dbConnect();
        const userId = session.user.id;
        const url = `/uploads/${req.file?.filename}`;
        const slug = slugify(req.body.title, {
          remove: /[*+~.()'"!:@]/g,
        });
        const post = new Post({
          title: req.body.title,
          description: req.body.description,
          slug,
          image: url,
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
