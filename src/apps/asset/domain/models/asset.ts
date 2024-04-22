import EtherModel from "@/common/model/model";
import AssetCategory from "./assetCategory";
import Profile from "@/apps/auth/domain/models/profile";

export default class Asset implements EtherModel {
    
    id?: string;
    name: string;
    categoryId: string;
    ownersId: (string | null)[];
    orgId?: string;

    category?: AssetCategory;

    currentOwner?: Profile;

    constructor(id: string | undefined, name: string, categoryId: string, ownerId: (string|null)[], orgId?: string) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
        this.ownersId = ownerId;
        this.orgId = orgId;
    }

    get currentOwnerId(): string | null{
        if(this.ownersId.length === 0){
            return null;
        }
        return this.ownersId[this.ownersId.length - 1];
    }
    
}
