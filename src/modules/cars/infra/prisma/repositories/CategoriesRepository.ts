import { CategoryCreateData, ICategoriesRepository } from "src/modules/cars/repositories/ICategoriesRepository";
import { Category } from "../entities/Category";
import { prisma } from './../../../../../instances/prisma';



export class CategoriesRepository implements ICategoriesRepository {

  async create ({name, description}: CategoryCreateData) {

    await prisma.category.create({
      data: {
        name, description
      }
    })
  }
  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      }
    })
    return categories
  }
  async findByName(name: string): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: {
        name
      }
    })
    return category!
  }

} 