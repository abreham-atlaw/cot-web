import Asset from "@/apps/asset/domain/models/asset";
import AssetCategory from "@/apps/asset/domain/models/assetCategory";
import AssetRequest from "@/apps/asset/domain/models/assetRequest";
import Profile from "@/apps/auth/domain/models/profile";
import { AsyncState } from "@/common/state/asyncState";
import Department from "../../domain/models/department";
import { CategoryCount } from "@/apps/asset/infrastructure/repositories/assetCategoryRepository";


export default class DashboardState extends AsyncState{

    assets?: Asset[];
    requests?: AssetRequest[];
    users?: Profile[];

    totalAssets?: number;
    availableAssets?: number;
    assignedAssets?: number;
    categoryAssetCounts?: Map<AssetCategory, CategoryCount>;
    departmentAssetCounts?: Map<Department, number>;

    totalRequests?: number;
    pendingRequests?: number;
    approvedRequests?: number;
    rejectedRequests?: number;

}