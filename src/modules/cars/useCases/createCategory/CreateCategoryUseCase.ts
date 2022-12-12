import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError";
import { CategoriesRepository } from "../../infra/prisma/repositories/CategoriesRepository";

interface IRequest {
  name: string;
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("PrismaCategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute({description, name}: IRequest) {
    // if (!description) {
    //   throw new AppError('Description is required.');
    // }

    if (!name) {
      throw new AppError('Name is required.');
    }

    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if(categoryAlreadyExists) {
      throw new AppError("Category alreary exists");
    }

    await this.categoriesRepository.create({
      description, name
    })

  }
}