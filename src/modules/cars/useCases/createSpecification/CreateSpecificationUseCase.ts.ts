import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError";
import { SpecificationsRepository } from "../../infra/prisma/repositories/SpecificationRepository";

interface IRequest {
  name: string;
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("PrismaSpecificationsRepository")
    private specificationRepository: SpecificationsRepository
  ) {}

  async execute({description, name}: IRequest) {
    if (!description) {
      throw new AppError('Description is required.');
    }

    if (!name) {
      throw new AppError('Name is required.');
    }

    const specificationAlreadyExists = await this.specificationRepository.findByName(name)

    if(specificationAlreadyExists.length > 0) {
      throw new AppError("Category alreary exists");
    }

    await this.specificationRepository.create({
      description, name
    })

  }
}