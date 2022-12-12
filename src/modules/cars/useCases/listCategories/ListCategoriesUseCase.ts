
import { inject, injectable } from "tsyringe"
import { Category } from "../../infra/prisma/entities/Category";
import { CategoriesRepository } from "../../infra/prisma/repositories/CategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("PrismaCategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories
  }
}