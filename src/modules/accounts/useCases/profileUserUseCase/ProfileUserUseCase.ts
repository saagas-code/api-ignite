
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { User } from './../../infra/prisma/entities/User';
import { inject, injectable } from 'tsyringe';
import { IUsersResponseDTO } from '../../dtos/IUserResponseDTO';
import { UserMap } from './../../mapper/UserMap';

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  )  {}
  async execute(id: string): Promise<IUsersResponseDTO> {
    const user = await this.usersRepository.findById(id)

    return UserMap.toDTO(user);
  }
}