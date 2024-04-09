

export default class AssetCategory {
    name: string;
    id?: string;
    orgId?: string;

    constructor(name: string, id?: string, orgId?: string) {
        this.name = name;
        this.id = id;
        this.orgId = orgId;
    }

}
