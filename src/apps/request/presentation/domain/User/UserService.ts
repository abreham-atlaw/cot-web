import { User } from "./User";

export interface UserService{
    fetchUsers():Promise<User[]>;
    createUser(user:User):Promise<User>;
    updateUser(userId:number):Promise<User>;
    deleteUser(userId:number):Promise<void>;

    
}