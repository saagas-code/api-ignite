import "reflect-metadata"
import {v4 as uuidV4} from "uuid"
import { CategoryCreateData, ICategoriesRepository } from '../../../../repositories/ICategoriesRepository';
import { Category } from '../../entities/Category';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];
  
  async list(): Promise<Category[]> {
    const all = this.categories
    return all
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category!
  }

  async create({name, description}: CategoryCreateData): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      //id: uuidV4(),
      name,
      description
    })
    this.categories.push(category)
  }

  
  
}