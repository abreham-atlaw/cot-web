import { AssetRequest } from "./AssetRequest";

export interface AssetRequestService{
    fetchAssetRequests():Promise<AssetRequest[]>;
    createAssetRequest(assetRequest:AssetRequest):Promise<AssetRequest>;
    updateAssetRequest(assetRequestId:string):Promise<AssetRequest>;
    deleteAssetRequest(assetRequestId:string):Promise<void>;

}