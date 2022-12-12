import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import auth from "../../../../config/auth";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { prisma } from "../../../../instances/prisma";
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { IUSersTokensRepository } from './../../repositories/IUsersTokensRepository';
import { DayjsDateProvider } from './../../../../shared/providers/DateProvider/implementations/DayjsDateProvider';

interface IRequest {
  email: string;
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string;
  refresh_token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUSersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: DayjsDateProvider
    ) {}

  async execute({email, password}: IRequest): Promise<IResponse> {
    const user = await prisma.user.findFirst({where: {email}})
    if(!user) {
      throw new AppError("Email or password incorrect!")
    }

    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch) {
      throw new AppError("Email or password incorrect!")
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: '30m'
    });

    const refresh_token = sign({email}, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: '30d'
    })

    const refresh_token_expires_date = this.dayjsDateProvider.addDays(30)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    }

    return tokenReturn
  }
}