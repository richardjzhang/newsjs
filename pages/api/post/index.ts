// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface User {
  id: number;
  name: string;
  email: string;
}

type Data = Array<User>;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json([
    {
      id: 1,
      name: "Sachin",
      email: "sachin@gmail.com",
    },
  ]);
}
