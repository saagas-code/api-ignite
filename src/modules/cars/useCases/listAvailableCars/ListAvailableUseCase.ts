
import { ICarsRepository } from '../../repositories/ICarsRepository';
import { Car } from '../../infra/prisma/entities/Car';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string
}

@injectable()
export class ListAvailableUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({category_id, brand, name}:IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand, 
      category_id, 
      name
    )
    return cars;
  }
}