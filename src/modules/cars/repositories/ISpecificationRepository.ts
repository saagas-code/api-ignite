import { Specification } from "../infra/prisma/entities/Specification";



interface SpecificationCreateData {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create: (data: SpecificationCreateData) => Promise<void>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification[]>;
  findById(id: string): Promise<Specification>
}

export {SpecificationCreateData, ISpecificationRepository}