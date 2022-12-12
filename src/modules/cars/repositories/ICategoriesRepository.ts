import { Category } from "../infra/prisma/entities/Category";



interface CategoryCreateData {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create: (data: CategoryCreateData) => Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export {CategoryCreateData, ICategoriesRepository}