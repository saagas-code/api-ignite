
import { Request, Response, NextFunction } from 'express';
import { AppError } from './AppError';

export const appErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
        message: err.message
    })
}
return res.status(500).json({
    status: "Error",
    message: `Internal server error - ${err.message}`
})
}