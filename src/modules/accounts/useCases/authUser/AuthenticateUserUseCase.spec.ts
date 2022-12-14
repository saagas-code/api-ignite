import "reflect-metadata"
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { UsersRepositoryInMemory } from './../../infra/prisma/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { UsersTokensRepositoryInMemory } from './../../infra/prisma/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from './../../../../shared/providers/DateProvider/implementations/DayjsDateProvider';
import { ICreateUserDTO } from './../../dtos/ICreateUserDTO';
import { AppError } from './../../../../errors/AppError';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let createUserUseCase: CreateUserUseCase



describe("Authenticate User", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );

    createUserUseCase = new CreateUserUseCase(
      usersRepositoryInMemory
    )

  })

  it("should be able to authenticate an user", async () => {

    const user: ICreateUserDTO = {
      name: "User Test",
      email: "user",
      driver_license: "8819",
      password: "user", 
    }
    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an user with wrong email", async () => {
    const user: ICreateUserDTO = {
      name: "User Test",
      email: "user",
      driver_license: "8819",
      password: "user", 
    }
    await createUserUseCase.execute(user)

    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "wrong email",
        password: user.password
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  
})