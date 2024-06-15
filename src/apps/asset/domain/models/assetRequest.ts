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
    departmentStatus: Status;
    rejectionNote?: string;
    userId?: string;
    createDateTime?: Date;
    
    user?: Profile;
    category?: AssetCategory;

    constructor(
        id: string | undefined, 
        categoryId: string, 
        note: string, 
        status: Status,
        departmentStatus: Status,
        rejectionNote: string | undefined,
        userId?: string,
        createDateTime?: Date
    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.note = note;
        this.status = status;
        this.departmentStatus = departmentStatus;
        this.userId = userId;
        this.rejectionNote = rejectionNote;
        this.createDateTime = createDateTime;
    }
}
