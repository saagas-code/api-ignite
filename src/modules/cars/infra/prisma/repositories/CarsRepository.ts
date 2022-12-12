import { ICreateCarDTO } from 'src/modules/cars/dtos/ICreateCarDTO';
import { Car } from '../entities/Car';
import { ICarsRepository } from './../../../repositories/ICarsRepository';
import { prisma } from './../../../../../instances/prisma';

export class CarsRepository implements ICarsRepository {
  
  
  async create({brand, category_id, daily_rate, description, fine_amount, license_plate, name}: ICreateCarDTO): Promise<Car> {
    const car = await prisma.car.create({
      data: {
        brand, 
        category_id, 
        daily_rate,
        description, 
        fine_amount, 
        license_plate, 
        name
      }
    })
    return car!
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await prisma.car.findUnique({
      where: {
        license_plate
      }
    })
    return car!
  }

  async findAvailable(brand?: string | undefined, category_id?: string | undefined, name?: string | undefined): Promise<Car[]> {
    let query: any = {
      available: true
    }

    if(brand) {
      query = {...query, brand: {contains: brand}}
    }
    if(category_id) {
      query = {...query, category_id: {contains: category_id}}
    }
    if(name) {
      query = {...query, name: {contains: name}}
    }
  
    const cars = await prisma.car.findMany({
      where: query,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    return cars
  }

  async findById(id: string): Promise<Car> {
    const car = await prisma.car.findUnique({
      where: {
        id
      }
    })

    return car!
  }

  async updateAvailable(id: string, available: boolean): Promise<Car> {
    const car = await prisma.car.update({
      where: {
        id
      },
      data: {
        available: available
      }
    })
    return car
  }

}