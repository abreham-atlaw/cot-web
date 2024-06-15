

export default class AssetCategory {
    name: string;
    id?: string;
    orgId?: string;
    parentId?: string;
    createDateTime?: Date;

    parent?: AssetCategory;

    constructor(id: string | undefined, name: string, orgId?: string, parentId?: string, createDateTime?: Date) {
        this.name = name;
        this.id = id;
        this.orgId = orgId;
        this.parentId = parentId;
        this.createDateTime = createDateTime;
    }

}
