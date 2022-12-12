import { sign, verify } from "jsonwebtoken"
import { IUSersTokensRepository } from './../../repositories/IUsersTokensRepository';
import { injectable, inject } from 'tsyringe';
import  auth  from '../../../../config/auth';
import { AppError } from './../../../../errors/AppError';
import { DayjsDateProvider } from './../../../../shared/providers/DateProvider/implementations/DayjsDateProvider';

interface IPayload {
  sub: string;
  email: string
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}
@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUSersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: DayjsDateProvider

  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const decode = verify(token, auth.secret_refresh_token) as IPayload
    
    const user_id = decode.sub;
    const email = decode.email

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id as string, token)
    
    if(!userToken) {
      throw new AppError("Refresh Token does not exists!")
    }
    
    await this.usersTokensRepository.deleteById(userToken.id);

    const expires_date = this.dayjsDateProvider.addDays(30)

    const refresh_token = sign({email}, auth.secret_refresh_token, {
      subject: decode.sub,
      expiresIn: '30d'
    })

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: '15m'
    });

    return {
      refresh_token,
      token: newToken
    }

  
  }
}