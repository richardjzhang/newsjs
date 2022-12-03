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
  if (req.method !== "POST") return errorHandler("Invalid Request Type", res);

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
      const { name, email } = userDoc;
      return responseHandler(
        {
          name,
          email,
        },
        res,
        201
      );
    }

    return errorHandler("Something went wrong", res);
  } catch (error) {
    let message = "Unknown error";
    if (error instanceof Error) return errorHandler(error.message, res);
    if (typeof error === "string") return errorHandler(error, res);
    return errorHandler(message, res);
  }
}
