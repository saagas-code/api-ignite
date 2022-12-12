
import { Request } from 'express';
import { Response } from 'express';
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';
import { container } from 'tsyringe';

export class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {

    const { id: user_id }  = req.user
    const { id } = req.params
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id
    })

      return res.status(200).json(rental)
  }
}