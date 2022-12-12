
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';



interface IFiles {
  filename: string;
  path: string
}


export class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const images = req.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((file) => file.filename)
    const images_path = images.map((file) => file.path)

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name,
      images_path
    })

    return res.status(201).send()
  }
}
