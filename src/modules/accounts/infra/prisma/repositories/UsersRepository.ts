import { prisma } from "../../../../../instances/prisma";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../../dtos/IUpdateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async create({name, email, driver_license, password, avatar, id}: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        name, 
        email, 
        driver_license,
        password,
        avatar,
        id
      }
    })
  }

  async update(data: IUpdateUserDTO, id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id
      },
      data
    })
  }
  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    return user!
  }
  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user!
  }



}

