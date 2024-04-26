

export default class AssetCategory {
    name: string;
    id?: string;
    orgId?: string;
    parentId?: string;

    parent?: AssetCategory;

    constructor(name: string, id?: string, orgId?: string, parentId?: string) {
        this.name = name;
        this.id = id;
        this.orgId = orgId;
        this.parentId = parentId;
    }

}
