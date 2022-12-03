// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import dbConnect from "lib/db-connect";
import { errorHandler, responseHandler, validateAllOnce } from "utils/common";
import User from "models/user";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    errorHandler("Invalid Request Type", res, 405);
    return;
  }

  try {
    validateAllOnce(req.body);

    // create db connection
    await dbConnect();
    const hashPassword = await bcrypt.hash(req.body.password, 8);

    const user = new User({
      ...req.body,
      password: hashPassword,
    });
    const saveUser = await user.save();

    if (saveUser) {
      const userDoc = saveUser._doc;
      const { password, ...userData } = userDoc;
      responseHandler(userData, res, 201);
      return;
    }

    return errorHandler("Something went wrong", res);
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
}
