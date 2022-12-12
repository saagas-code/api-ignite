import { inject, injectable } from "tsyringe";
import { ICarsRepository } from './../../repositories/ICarsRepository';
import { prisma } from './../../../../instances/prisma';
import { AppError } from './../../../../errors/AppError';
import { Car } from './../../infra/prisma/entities/Car';

export interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({name, description, daily_rate, license_plate, fine_amount, brand, category_id  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    )
    if(carAlreadyExists) {
      throw new AppError("Car already exists!");
    }
    
    const car = await this.carsRepository.create({
      name, 
      description, 
      daily_rate, 
      license_plate, 
      fine_amount, 
      brand, 
      category_id
    });

    return car
  }
}

// const carAlreadyExists = await prisma.car.findUnique({
//   where: {
//    license_plate
//   }
// })