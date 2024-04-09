import EtherModel from "@/common/model/model";


export enum Role{

    admin,
    hr,
    inventory,
    staff,
    department

}


export default class Profile implements EtherModel {

    id?: string;
    name: string;
    role: number;
    userKey: string;
    email: string;
    organizationId?: string;

    constructor(name: string, role: number, userKey: string, email: string, organizationId?: string, id?: string) {
        this.name = name;
        this.role = role;
        this.userKey = userKey;
        this.email = email;
        this.organizationId = organizationId;
        this.id = id;
    }

    get hasOrganization(): boolean {
        return !!this.organizationId;
    }
}
