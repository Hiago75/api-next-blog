import { IItemsToBeUpdated } from "./IItemsToBeUpdated";

export interface IUpdateAuthor {
  user_id: string;
  itemsSentToUpdate: IItemsToBeUpdated;
}
