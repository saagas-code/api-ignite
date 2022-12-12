
import { Decimal } from '@prisma/client/runtime';
import { Car } from './../../../../cars/infra/prisma/entities/Car';
import { User } from './../../../../accounts/infra/prisma/entities/User';

export interface Rental {
  id: string;
  car_id: string;
  user_id: string;
  start_date: Date;
  end_date: Date | null;
  expected_return_date: Date;
  total: Decimal | null;
  created_at: Date;
  updated_at: Date;
  car?: Car
}