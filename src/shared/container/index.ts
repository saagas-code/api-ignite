
import { container } from 'tsyringe'
import { UsersRepository } from '../../modules/accounts/infra/prisma/repositories/UsersRepository';
import { CategoriesRepository} from '../../modules/cars/infra/prisma/repositories/CategoriesRepository'
import { SpecificationsRepository } from '../../modules/cars/infra/prisma/repositories/SpecificationRepository'
import { ICarsRepository } from './../../modules/cars/repositories/ICarsRepository';
import { CarsRepository } from './../../modules/cars/infra/prisma/repositories/CarsRepository';
import { ISpecificationCarRepository } from '../../modules/cars/repositories/ISpecificationCarRepository';
import { SpecificationCarRepository } from './../../modules/cars/infra/prisma/repositories/SpecificationCarRepository';
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { ICarsImagesRepository } from './../../modules/cars/repositories/ICarsImagesRepository';
import { CarsImageRepository } from './../../modules/cars/infra/prisma/repositories/CarsImagesRepository';
import { IRentalsRepository } from './../../modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from './../../modules/rentals/infra/prisma/repositories/RentalsRepository';
import { IDateProvider } from './../providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from './../providers/DateProvider/implementations/DayjsDateProvider';
import { UsersTokensRepository } from './../../modules/accounts/infra/prisma/repositories/UsersTokensRepository';
import { IUsersRepository } from './../../modules/accounts/repositories/IUsersRepository';
import { IUSersTokensRepository } from 'src/modules/accounts/repositories/IUsersTokensRepository';
import { IMailProvider } from './../providers/MailProvider/IMailProvider';
import { EtherealMailProvider } from './../providers/MailProvider/implementations/EtherealMailProvider';
import { IStorageProvider } from './../providers/StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './../providers/StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './../providers/StorageProvider/implementations/S3StorageProvider';
// ICategoryRepository
container.registerSingleton<CategoriesRepository>(
  "PrismaCategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "PrismaSpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<UsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<ICarsRepository>(
  "CarsRepository",
  CarsRepository
)

container.registerSingleton<ISpecificationCarRepository>(
  "SpecificationCarRepository",
  SpecificationCarRepository
)

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
)

container.registerSingleton<IUSersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
)



// Providers
container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
)

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
)

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage.s3
)