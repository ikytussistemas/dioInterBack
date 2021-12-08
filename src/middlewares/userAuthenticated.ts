import { NextFunction, Request, Response } from "express";
import AppError from '../shared/error/AppError';

import authConfig from '../config/auth';
import { verify } from "jsonwebtoken";


interface ITokenPlayload {
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
  sub: string;
}

export default function userAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    throw new AppError('Não foi enviado o JWT', 401);
  }

  const [, token] = authHeader.split(' ');
  
  try {
    const decoded = verify(token, authConfig.jwt.secret);
    
    const { sub, firstName, lastName } = decoded as ITokenPlayload;

    req.user = {
      id: sub,
      firstName,
      lastName
    };

    return next()
    
  } catch (error) {
    throw new AppError('token JWT inválido', 401);
  }
}