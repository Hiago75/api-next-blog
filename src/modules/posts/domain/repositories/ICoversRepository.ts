import { Covers } from "src/entities/Covers";

export interface ICoversRepository {
  findById(id: string): Promise<Covers | undefined>
}
