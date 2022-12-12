import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { User } from '../../infra/prisma/entities/User';
import { IStorageProvider } from './../../../../shared/providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({user_id, avatar_file}: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id)
    
    if(user.avatar) {
      //await deleteFile(`./tmp/avatar/${user.avatar}`)
      await this.storageProvider.delete(user.avatar, "avatar");
    }
    await this.storageProvider.save(avatar_file, "avatar")
    

    const data = {
      avatar: avatar_file
    }
    await this.usersRepository.update(data, user_id)
  }
}