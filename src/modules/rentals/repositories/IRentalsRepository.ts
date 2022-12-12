
import { Rental } from './../infra/prisma/entities/Rental';
import { ICreateRentalDTO } from './../DTOs/ICreateRentalDTO';
import { IUpdateRentalDTO } from './../DTOs/IUpdateRentalDTO';

export interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  update(data: IUpdateRentalDTO, id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  findByUser(user_id: string): Promise<Rental[]>
}