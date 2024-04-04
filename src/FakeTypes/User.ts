import { Department } from "./Department";


export enum Role{
    Admin,
    User,
    Manager,
    Inventor,
    Technician,
    HR
}
export interface User{
    id:string;
    email:string;
    firstName:string;
    lastName:string;
    role: Role;
    department?:Department;
}