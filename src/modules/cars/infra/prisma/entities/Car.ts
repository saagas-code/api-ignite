import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";


export class Car {
  id?: string
  name!: string;
  description!: string;
  daily_rate!: Prisma.Decimal;
  available!: boolean;
  license_plate!: string;
  fine_amount!: Prisma.Decimal;
  brand!: string;
  category_id!: string;
}