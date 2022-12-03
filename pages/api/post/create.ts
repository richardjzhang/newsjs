// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "lib/db-connect";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(400).json({ name: "Invalid Request Type" });
  }

  await dbConnect();

  const { name } = req.body;

  res.status(200).json({
    name,
  });
}
