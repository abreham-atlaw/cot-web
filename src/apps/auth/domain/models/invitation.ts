import EtherModel from "@/common/model/model";


export default class Invitation implements EtherModel {

    id?: string;
    to: string;
    role: number;
    orgId: string;
    name: string;

    constructor(id: string | undefined, to: string, role: number, orgId: string, name: string) {
        this.id = id;
        this.to = to;
        this.role = role;
        this.orgId = orgId;
        this.name = name;
    }
}
