
import { CarImage } from '../entities/CarImage';
import { ICarsImagesRepository } from './../../../repositories/ICarsImagesRepository';
import { prisma } from './../../../../../instances/prisma';


export class CarsImageRepository implements ICarsImagesRepository {

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const image = await prisma.carImage.create({
      data: {
        car_id, image_name
      }
    })
    return image
  }
  
}