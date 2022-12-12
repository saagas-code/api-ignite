import { inject, injectable } from "tsyringe"
import { ICarsImagesRepository } from './../../repositories/ICarsImagesRepository';
import { deleteFile } from './../../../../utils/file';
import { IStorageProvider } from './../../../../shared/providers/StorageProvider/IStorageProvider';

interface IRequest {
  car_id: string;
  images_name: string[];
  images_path: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async unlinkPaths(paths: string[]): Promise<void> {
    for(let i in paths) {
      await deleteFile(paths[i])
    }
  }
  
 async execute({car_id, images_name, images_path}: IRequest) {
  //await this.unlinkPaths(images_path)

  images_name.map(async (image) => {

    await this.carsImagesRepository.create(
      car_id, image
    )
    await this.storageProvider.save(image, "cars");
  })

 }
}