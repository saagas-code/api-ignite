import { Request, Response } from 'express'
import { ImportCategoryUseCase } from "./importCategoryUseCase";
import { container } from "tsyringe"

export class ImportCategoryController {
  
  async handle(request: Request, response: Response) {
    const {file} = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
    
    if(file) {
      await importCategoryUseCase.execute(file);
    }

    return response.status(201).send()
  }
}