import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/prisma/entities/User";




export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  update(data: IUpdateUserDTO, id: string): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  
}