import fs from 'fs'
import { parse } from 'csv-parse';
import { inject, injectable } from "tsyringe"
import { CategoriesRepository } from '../../infra/prisma/repositories/CategoriesRepository';

interface IRequest {
  name: string;
  description: string
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("PrismaCategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  async loadCategories(file: Express.Multer.File): Promise<IRequest[]> {
    return new Promise(function (resolve, reject) {
      const stream = fs.createReadStream(file.path);
      const categories: IRequest[] = []

      const parseFile = parse({
          delimiter: ','
      });

      stream.pipe(parseFile)

      parseFile.on("data", async (line) => {
          const [name, description] = line
          categories.push({
              name,
              description
          });
      })
      .on("end", () => {
          fs.promises.unlink(file.path)
          resolve(categories)
      })
      .on("error", (err) => {
          reject(err)
      })
  })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const {name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);
      
      if(!existCategory) {
        await this.categoriesRepository.create({
            name, description
        })
      }
    })
  }
}