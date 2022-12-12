
import { IRentalsRepository } from './../../repositories/IRentalsRepository';
import { AppError } from './../../../../errors/AppError';
import { ICarsRepository } from './../../../cars/repositories/ICarsRepository';
import { inject } from 'tsyringe';
import { injectable } from 'tsyringe';
import { IDateProvider } from './../../../../shared/providers/DateProvider/IDateProvider';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { IUpdateRentalDTO } from './../../DTOs/IUpdateRentalDTO';
import { Rental } from './../../infra/prisma/entities/Rental';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

  ) {}

  async execute({id, user_id}: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)
    const minimum_daily = 1;

    if(!rental) {
      throw new AppError("Rental dosen't exists")
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    )
    daily = minimum_daily

    if(daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow, 
      rental.expected_return_date
    );

    const carFine: any = rental.car?.fine_amount
    const delayN = new Prisma.Decimal(delay)
    let total: any = 0

    if(delay < 0) {
      const calculate_fine = (delayN as any * carFine as any) 
      total = calculate_fine
    }

    const carDaily: any = rental.car?.daily_rate
    total += daily * carDaily

    rental.end_date = this.dateProvider.dateNow()
    rental.total = total
    
    const data: IUpdateRentalDTO = {
      end_date: rental.end_date,
      total: total
    }
    await this.rentalsRepository.update(
      data,
      rental.id
    )

    const car = await this.carsRepository.updateAvailable(rental.car?.id as string, true)
    rental.car = car

    return rental
  }
}