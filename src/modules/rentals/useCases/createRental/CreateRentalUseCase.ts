import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { AppError } from './../../../../errors/AppError';
import { IRentalsRepository } from './../../repositories/IRentalsRepository';
import { Rental } from './../../infra/prisma/entities/Rental';
import { injectable, inject } from 'tsyringe';
import { ICarsRepository } from './../../../cars/repositories/ICarsRepository';
import { IDateProvider } from './../../../../shared/providers/DateProvider/IDateProvider';

dayjs.extend(utc)

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {

  
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({car_id, expected_return_date, user_id}: IRequest): Promise<Rental> {
    const minimumHour = 24;
    // return expected_return_date as any

    if(!car_id || !expected_return_date || !user_id) {
      throw new AppError("Missing required data", 422)
    }
    
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if(carUnavailable) {
      throw new AppError("Car unavailable");
    }

    

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
    
    if(rentalOpenToUser) {
      throw new AppError("There's a rental in progress for this user!");
    }

    

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    )
  
    if(compare < minimumHour) {
      throw new AppError("Invalid return time !")
    }
    
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    })

    await this.carsRepository.updateAvailable(
      car_id, false
    )

    return rental
  }


}