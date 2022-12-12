
import { Request, Response } from 'express';
import {container} from 'tsyringe'

import { ListAvailableUseCase } from './ListAvailableUseCase';

export class ListAvailableCarsController {
  
  async handle(req: Request, res: Response): Promise<Response> {
    const {brand, name, category_id} = req.query;

    const listAvailableCarsUseCars = container.resolve(
      ListAvailableUseCase
    )

    const cars = await listAvailableCarsUseCars.execute({
      brand: brand as string, 
      name: name as string, 
      category_id: category_id as string
    })

    return res.status(200).json(cars)
  }
}