
import { injectable, inject } from 'tsyringe';
import {v4 as uuidV4} from "uuid"
import {resolve} from "path"
import { IUSersTokensRepository } from '../../repositories/IUsersTokensRepository';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { AppError } from './../../../../errors/AppError';
import { IDateProvider } from './../../../../shared/providers/DateProvider/IDateProvider';
import { IMailProvider } from './../../../../shared/providers/MailProvider/IMailProvider';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUSersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider,

  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs") 

    if(!user) {
      throw new AppError("User does not exists")
    }
    
    const token = uuidV4();
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id!,
      expires_date 
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail(
      email, 
      "Recuperacao de senha", 
      variables,
      templatePath
    )

  }
}