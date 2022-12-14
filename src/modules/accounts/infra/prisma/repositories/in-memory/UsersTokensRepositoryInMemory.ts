
import { ICreateUserTokenDTO } from 'src/modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '../../entities/UserTokens';
import { IUSersTokensRepository } from './../../../../repositories/IUsersTokensRepository';


export class UsersTokensRepositoryInMemory implements IUSersTokensRepository {
  usersTokens: UserTokens[] = []
  
  async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userTokenn = new UserTokens()

    Object.assign(userTokenn, {
      expires_date,
      refresh_token,
      user_id
    })
    this.usersTokens.push(userTokenn)

    return userTokenn
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    
    const userToken = this.usersTokens.find((ut) => 
      ut.user_id === user_id && ut.refresh_token === refresh_token
    )
    return userToken!
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id);
    this.usersTokens.splice(
      this.usersTokens.indexOf(userToken!)
    )
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find((ut) => ut.refresh_token === refresh_token)
    return userToken!
  }


}

