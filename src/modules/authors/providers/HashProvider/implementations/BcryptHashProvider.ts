import { compare, hash } from "bcrypt";
import { IHashProvider } from "../models/IHashProvider";

export class BcryptHashProvider implements IHashProvider {
  public async generateHash(itemToBeHashed: string): Promise<string> {
    return hash(itemToBeHashed, 10);
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
