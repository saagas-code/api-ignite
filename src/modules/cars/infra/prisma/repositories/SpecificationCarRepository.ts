
import { ISpecificationCarRepository, ISpecificationCarDTO } from './../../../repositories/ISpecificationCarRepository';
import { prisma } from './../../../../../instances/prisma';
import { CarsRepository } from './CarsRepository';



export class SpecificationCarRepository implements ISpecificationCarRepository {
  
  async create ({ car_id, specification_id }: ISpecificationCarDTO): Promise<void> {
    await prisma.specificationCar.create({
      data: {
        car_id,
        specification_id
      }
    })
    
  }
  
}