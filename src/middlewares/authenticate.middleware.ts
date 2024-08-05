import express from 'express';

// Services
// Interfaces
import IRequestInterface from '@interfaces/IRequest.interface';
import constants from 'constants';
import ApiResponse from 'utilities/api-response.utility';
import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';

// Utilities

// Constants

export default async (
  req: IRequestInterface,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (constants.APPLICATION.authorizationIgnorePath.includes(req.originalUrl)) {
    return next(); // Pozwól na przejście bez autoryzacji
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED, 'No token provided');
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) {
      return ApiResponse.error(res, httpStatusCodes.FORBIDDEN, 'Invalid token');
    }
    req.user = user;
    next();
  });
};
