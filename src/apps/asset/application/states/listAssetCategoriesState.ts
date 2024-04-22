import ModelListState from "@/common/state/modelListState";
import AssetCategory from "../../domain/models/assetCategory";



export interface CategoryCount{
    allocated: number;
    unallocated: number;
    total: number;
}

export default class ListAssetCategoriesState extends ModelListState<AssetCategory>{

    counts?: Map<AssetCategory, CategoryCount>;

}