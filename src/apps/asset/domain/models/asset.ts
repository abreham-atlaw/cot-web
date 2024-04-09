import EtherModel from "@/common/model/model";

export default class Asset implements EtherModel {
    
    id: string;
    categoryId: string;
    ownerId?: string;
    orgId?: string;

    constructor(id: string, categoryId: string, ownerId?: string, orgId?: string) {
        this.id = id;
        this.categoryId = categoryId;
        this.ownerId = ownerId;
        this.orgId = orgId;
    }
}
