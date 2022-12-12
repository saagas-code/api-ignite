import { CategoryCreateData } from "src/modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "../../../repositories/ISpecificationRepository";

import { Specification } from "../entities/Specification";
import { prisma } from './../../../../../instances/prisma';



export class SpecificationsRepository implements ISpecificationRepository {
  
  async create ({name, description}: CategoryCreateData): Promise<void> {

    await prisma.specification.create({
      data: {
        name, description
      }
    })
  }
  async list(): Promise<Specification[]> {
    const specifications = await prisma.specification.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      }
    })
    return specifications
  }
  async findByName(name: string): Promise<Specification[]> {
    const specification = await prisma.specification.findMany({
      where: {
        name
      }
    })
    return specification
  }

  async findById(id: string): Promise<Specification> {
    const specifications = await prisma.specification.findUnique({
      where: {
        id
      }
    })
    return specifications!
  }

} 