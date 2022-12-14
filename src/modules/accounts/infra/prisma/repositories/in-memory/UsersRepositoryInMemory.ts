
import { ICreateUserDTO } from 'src/modules/accounts/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from 'src/modules/accounts/dtos/IUpdateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from './../../../../repositories/IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = []
  
  async create({driver_license, email, name, password}: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license, email, name, password
    })

    this.users.push(user);
  }
  async update({avatar, driver_license, email, name, password}: IUpdateUserDTO, id: string): Promise<void> {
    const index = this.users.findIndex((i => i.id == id));
    if(avatar) {
      this.users[index].avatar = avatar;
    }
    if(driver_license) {
      this.users[index].driver_license = driver_license
    }
    if(email) {
      this.users[index].email = email
    }
    if(name) {
      this.users[index].name = name;
    }
    if(password) {
      this.users[index].password = password;
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email)!
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id)!
  }

}