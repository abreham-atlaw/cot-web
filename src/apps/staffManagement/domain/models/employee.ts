import { Role } from "@/apps/auth/domain/models/profile";



export default interface Employee{

    id: string;
    email: string;
    role: Role;

}