import { inject, injectable } from "tsyringe";
import { IUSersTokensRepository } from 'src/modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from './../../../../errors/AppError';
import { IDateProvider } from './../../../../shared/providers/DateProvider/IDateProvider';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { hash } from "bcrypt";
import { IUpdateUserDTO } from './../../dtos/IUpdateUserDTO';

interface IRequest {
  token: string,
  password: string
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUSersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({token, password}: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    )

    if(!userToken) {
      throw new AppError("Token invalid");
    }

    if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError("Token expired");
    }
    
    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8);

    await this.usersRepository.update(user as IUpdateUserDTO, user.id as string)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}