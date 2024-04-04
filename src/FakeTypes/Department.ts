import { User } from "./User";


export interface Department{
    id:string;
    name:string;
    manager?: User;
    staff? : string[];
}