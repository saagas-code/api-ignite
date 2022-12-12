
import { inject, injectable } from 'tsyringe';
import { AppError } from './../../../../errors/AppError';
import { ICarsRepository } from './../../repositories/ICarsRepository';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';
import { ISpecificationCarRepository } from '../../repositories/ISpecificationCarRepository';

interface IRequest {
  car_id: string;
  specification_id: string
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("PrismaSpecificationsRepository")
    private specificationsRepository: ISpecificationRepository,
    @inject("SpecificationCarRepository")
    private specificationsCarRepository: ISpecificationCarRepository

  ) {}
  async execute({car_id, specification_id}: IRequest ): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id)

    if(!carExists) {
      throw new AppError("Car does not exists!");
    }

    const specifications = await this.specificationsRepository.findById(
      specification_id 
    )

    if(!specifications) {
      throw new AppError("Specification does not exists!");
    }

    const specificationCar = await this.specificationsCarRepository.create({
      car_id, specification_id
    })
  }
}