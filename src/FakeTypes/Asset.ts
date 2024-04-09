import { User } from "./User";

export interface Asset{
  id: string;
  title:string;
  type: string;
  addDateTime: Date;
  owner?: User;
  active: boolean; 
  assignReason?:string;
  assignDateTime?: Date;
  removeReason?:string;
}
