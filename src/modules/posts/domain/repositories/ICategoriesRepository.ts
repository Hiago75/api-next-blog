import { Categories } from "src/entities/Categories";

export interface ICategoriesRepository {
  findAll(): Promise<Categories[]>;
  findById(id: string): Promise<Categories | undefined>
  findIdByName(name: string): Promise<string | undefined>;
}
