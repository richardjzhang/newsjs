import type { NextApiRequest, NextApiResponse } from "next";

export const errorHandler = (
  data: string,
  res: NextApiResponse,
  code: number = 400
) => {
  return res.status(code).json({
    hasError: true,
    errorMessage: data,
  });
};

export const responseHandler = (
  data: {
    name: string;
    email: string;
  },
  res: NextApiResponse,
  code: number = 200
) => {
  return res.status(code).json({
    hasError: false,
    body: data,
  });
};

export const validateAllOnce = (fields: { [key: string]: string }) => {
  for (let key in fields) {
    if (fields[key].trim() === "") {
      throw `${key} required`;
    }
  }
};
