import { JWT_SECRET } from '../constants';

const jwt = require('jsonwebtoken');

export const getJwt = (
  userId: string,
  extraData: Record<string, string | number | boolean> = {},
) => {
  console.log('SNGING', {
    userId,
    ...extraData,
  });
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      data: {
        userId,
        ...extraData,
      },
    },
    JWT_SECRET,
  );
};

export const parseJwt = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
