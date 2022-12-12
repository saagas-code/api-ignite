
export interface ISpecificationCarDTO {
  car_id: string;
  specification_id: string;
}

export interface ISpecificationCarRepository {
  create({car_id, specification_id}: ISpecificationCarDTO): Promise<void>;
}