import Department from "@/apps/core/domain/models/department";
import EtherModel from "@/common/model/model";


export enum Role{

    admin,
    hr,
    inventory,
    staff,
    department,
    maintainer

}


export default class Profile implements EtherModel {

    id?: string;
    name: string;
    role: number;
    userKey: string;
    email: string;
    departmentId?: string; 
    organizationId?: string;
    createDateTime?: Date;

    department?: Department;

    constructor(name: string, role: number, userKey: string, email: string, organizationId?: string, id?: string, department?: string, createDateTime?: Date) {
        this.name = name;
        this.role = role;
        this.userKey = userKey;
        this.email = email;
        this.organizationId = organizationId;
        this.id = id;
        this.departmentId = department;
        this.createDateTime = createDateTime;
    }

    get hasOrganization(): boolean {
        return !!this.organizationId;
    }

    
}
