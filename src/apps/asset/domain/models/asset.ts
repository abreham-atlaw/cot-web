import EtherModel from "@/common/model/model";
import AssetCategory from "./assetCategory";
import Profile from "@/apps/auth/domain/models/profile";

export default class Asset implements EtherModel {
    
    id?: string;
    name: string;
    categoryId: string;
    ownersId: (string | null)[];
    orgId?: string;
    createDateTime?: Date;

    category?: AssetCategory;

    currentOwner?: Profile;

    constructor(id: string | undefined, name: string, categoryId: string, ownerId: (string|null)[],orgId?: string, createDateTime?: Date) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.ownersId = ownerId;
        this.orgId = orgId;
        this.createDateTime = createDateTime;
    }

    get currentOwnerId(): string | null{
        if(this.ownersId.length === 0){
            return null;
        }
        return this.ownersId[this.ownersId.length - 1];
    }

    get isAllocated(): boolean{
        return (this.currentOwnerId !== null);
    }
    
    setOwner(owner?: Profile){
        this.ownersId.push(owner?.id ?? null);
    }
}
