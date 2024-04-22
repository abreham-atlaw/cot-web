import EtherModel from "@/common/model/model";
import AssetCategory from "./assetCategory";
import Profile from "@/apps/auth/domain/models/profile";


export enum Status{

    pending,
    approved,
    rejected

}

export default class AssetRequest implements EtherModel {

    id?: string;
    categoryId: string;
    note: string;
    status: Status;
    userId?: string;
    
    user?: Profile;
    category?: AssetCategory;

    constructor(
        id: string | undefined, 
        categoryId: string, 
        note: string, 
        status: Status,
        userId?: string
    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.note = note;
        this.status = status;
        this.userId = userId;
    }
}
