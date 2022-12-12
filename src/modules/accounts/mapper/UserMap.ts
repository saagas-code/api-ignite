
import { IUsersResponseDTO } from '../dtos/IUserResponseDTO';
import { User } from './../infra/prisma/entities/User';

export class UserMap {

  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license
  }: User): IUsersResponseDTO {
    return {
      email,
      name,
      id, 
      avatar: `${process.env.AWS_BUCKET_URL}/avatar/${avatar}`,
      driver_license
    }
  }
}