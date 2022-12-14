import "reflect-metadata"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { CategoriesRepositoryInMemory } from './../../infra/prisma/repositories/inMemory/CategoriesRepositoryInMemory';
import { AppError } from './../../../../errors/AppError';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe("create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  })

  let category = {
    name: "Category test",
    description: "Category descrip teste"
  }

  //exemplo 1
  // it("should be able to create a new category", async () => {
  //   await expect(createCategoryUseCase.execute({
  //     description: category.description,
  //     name: category.name
  //   })).resolves.not.toThrow();
  
  // })

  //exemplo 2
  // it("should be able to create a new category", async () => {
  //   await expect(createCategoryUseCase.execute({
  //     description: category.description,
  //     name: category.name
  //   })).resolves.not.toThrow()
    
  //   expect(categoriesRepositoryInMemory.categories).toEqual(
  //     expect.arrayContaining([
  //       expect.objectContaining({
  //         name: category.name,
  //         description: category.description
  //       })
  //     ])
  //   )
  // })

  //exemplo 3
  it('should be able to create a new category', async () => {
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description
    })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    )

    expect(categoryCreated).toHaveProperty("id")
    expect(categoryCreated.name).toBe(category.name)
    expect(categoryCreated.description).toBe(category.description)
  })

  it("should not be able to create a new category with same name exists", async () => {
    expect(async () => {
      
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
  
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new category without a name", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: '',
        description: category.description
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new category without a description", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: category.name,
        description: ''
      })
    }).rejects.toBeInstanceOf(AppError)
  })

})