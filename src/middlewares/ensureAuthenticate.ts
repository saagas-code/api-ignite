import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/infra/prisma/repositories/UsersRepository";
import { UsersTokensRepository } from './../modules/accounts/infra/prisma/repositories/UsersTokensRepository';

declare global {
  namespace Express {
      interface Request {
      user: {
        id: string
      }
  }
}
}

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ")

  try {
    const {sub: user_id} = verify(token, process.env.JWT_SECRET_KEY as string) as IPayload;
    
    //const usersRepository = new UsersRepository();
    const userTokensRepository = new UsersTokensRepository();

    // const user = await userTokensRepository.findByUserIdAndRefreshToken(
    //   user_id,
    //   token
    // );
    // if(!user) {
    //   throw new AppError("User not exists!", 401)
    // }

    request.user = {
      id: user_id!
    }

    next()

  } catch (err) {
    throw new AppError("Invalid token!", 401)
  }
}