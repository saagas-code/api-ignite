import "reflect-metadata";
import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase.ts'
import { container } from "tsyringe"

export class CreateSpecificationController {

  async handle(req: Request, res: Response) {
    const {name, description} = req.body
    
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase)
    await createSpecificationUseCase.execute({
      name, description
    })
    return res.status(201).send()
  }
}