

import { Rental } from '../entities/Rental';
import { IRentalsRepository } from './../../../repositories/IRentalsRepository';
import { prisma } from './../../../../../instances/prisma';
import { ICreateRentalDTO } from './../../../DTOs/ICreateRentalDTO';
import { Car } from './../../../../cars/infra/prisma/entities/Car';
import { IUpdateRentalDTO } from 'src/modules/rentals/DTOs/IUpdateRentalDTO';

export class RentalsRepository implements IRentalsRepository {
  
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const car = await prisma.rental.findFirst({
      where: {
        car_id,
        end_date: null
      }
    })
    return car!
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const user = await prisma.rental.findFirst({
      where: {
        user_id,
        end_date: null
      }
    })
    return user!
  }
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = await prisma.rental.create({
      data
    })
    return rental
  }

  async findById(id: string): Promise<Rental> {
    const rental = await prisma.rental.findUnique({
      where: {
        id
      },
      include: {
        car: true
      }
    })
    return rental!
  }

  async update(data: IUpdateRentalDTO, id: string): Promise<Rental> {
    const rental = await prisma.rental.update({
      where: {
        id
      },
      data
    })

    return rental!
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await prisma.rental.findMany({
      where: {
        user_id
      },
      include: {
        car: true
      }
    })
    return rentals
  }

}