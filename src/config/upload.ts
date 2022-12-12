import multer from "multer"
import {resolve} from "path"
import crypto from "crypto"
import { AppError } from './../errors/AppError';

const tmpFolder = resolve(__dirname, "..", "..", "tmp")

export default {
  tmpFolder,

  upload() {
    const storageConfig = multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString("hex");
        const fileName = `${fileHash}-${file.originalname}`;

        callback(null, fileName)
      }
    })

    return {
      upload: multer({
        fileFilter: (req, file, cb) => {
          const allowed: string[] = ['image/jpg', 'image/jpeg','image/png']

          if(allowed.includes(file.mimetype)) {
            cb(null, true)
          } else {
            return cb (new AppError("File type not accepted, please send a jpg/jpeg/png") as any);
          }
        },
        limits: {fieldSize: 2000000},
        storage: storageConfig
      })
    }
  }
}