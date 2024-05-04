import Profile from "@/apps/auth/domain/models/profile";
import EtherModel from "@/common/model/model";


export default class Department implements EtherModel {
    
    id?: string;
    name: string;
    headId: string;
    orgId?: string;

    head?: Profile;

    constructor(id: string | undefined, name: string, headId: string, orgId?: string) {
        this.id = id;
        this.name = name;
        this.headId = headId;
        this.orgId = orgId;
    }
}
