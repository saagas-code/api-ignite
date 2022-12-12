
import { ICreateUserTokenDTO } from 'src/modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '../entities/UserTokens';
import { IUSersTokensRepository } from './../../../repositories/IUsersTokensRepository';
import { prisma } from './../../../../../instances/prisma';

export class UsersTokensRepository implements IUSersTokensRepository {
  
  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await prisma.userToken.create({
      data: {
        expires_date,
        refresh_token,
        user_id
      }
    })

    return userToken
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    const usersTokens = await prisma.userToken.findFirst({
      where: {
        user_id,
        refresh_token
      }
    })

    return usersTokens!
  }

  async deleteById(id: string): Promise<void> {
    await await prisma.userToken.delete({
      where: {
        id
      }
    })
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        refresh_token
      }
    })

    return userToken!
  }

}