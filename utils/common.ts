import type { NextApiRequest, NextApiResponse } from "next";

export const errorHandler = (
  data: string,
  res: NextApiResponse,
  code: number = 400
) => {
  res.status(code).json({
    hasError: true,
    errorMessage: data,
  });
};

export const responseHandler = (
  data: { [key: string]: string } | any[],
  res: NextApiResponse,
  code: number = 200
) => {
  res.status(code).json({
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
