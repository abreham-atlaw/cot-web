import { Asset } from "./Asset";

export interface AssetService{
    fetchAssets():Promise<Asset[]>;
    createAsset(asset:Asset):Promise<Asset>;
    updateAsset(asset:Asset):Promise<Asset>;
    deleteAsset(assetId:string):Promise<void>;
}
