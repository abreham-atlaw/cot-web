import EtherModel from "@/common/model/model";


export default class Invitation implements EtherModel {

    id?: string;
    to: string;
    role: number;
    orgId: string;

    constructor(id?: string, to: string, role: number, orgId: string) {
        this.id = id;
        this.to = to;
        this.role = role;
        this.orgId = orgId;
    }
}
