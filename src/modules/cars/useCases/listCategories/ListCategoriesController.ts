
import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';
import {container} from 'tsyringe'

export class ListCategoriesController {
  
  async handle(req: Request, res: Response) {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)

    const categories = await listCategoriesUseCase.execute()
    return res.status(201).json({categories})
  }
}