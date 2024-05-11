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
    
    user?: Profile;
    asset?: Asset;

    constructor(
        id: string | undefined, 
        assetId: string, 
        note: string, 
        status: Status,
        userId?: string
    ) {
        this.id = id;
        this.assetId = assetId;
        this.note = note;
        this.status = status;
        this.userId = userId;
    }
}
