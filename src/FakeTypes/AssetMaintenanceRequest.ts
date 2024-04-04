import { Asset } from "./Asset";
import { User } from "./User";

export interface AssetMaintenanceRequest{
    id: string;
    createDatetime: Date;
    resolveDatetime?: Date;
    approved?: boolean;
    user: User;
    rejected?: boolean;
    rejectionReason?: undefined;
    asset: Asset;
    questionReason:string;
    approvedReason?:string;
    forward?:boolean;
}