import EtherModel from "@/common/model/model";
import Profile from "@/apps/auth/domain/models/profile";
import { Status } from "./assetRequest";
import Asset from "./asset";


export default class AssetMaintenanceRequest implements EtherModel {
    id?: string;
    assetId: string;
    note: string;
    status: Status;
    userId?: string;
    image: string;
    createDateTime?: Date;
    
    user?: Profile;
    asset?: Asset;

    constructor(
        id: string | undefined, 
        assetId: string, 
        note: string, 
        status: Status,
        image: string,
        userId?: string,
        createDateTime?: Date
    ) {
        this.id = id;
        this.assetId = assetId;
        this.note = note;
        this.status = status;
        this.userId = userId;
        this.image = image;
        this.createDateTime = createDateTime;
    }
}
