import { ErrorRequestHandler } from "express";
import { MulterError } from "multer";


export const multerErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400);

  if(err instanceof MulterError) {
      res.json({error: err.code})
  } else {
      res.json({error: 'Ocorreu algum erro.'});
  }
}