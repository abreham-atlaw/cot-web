import ModelListState from "@/common/state/modelListState";
import AssetCategory from "../../domain/models/assetCategory";
import { CategoryCount } from "../../infrastructure/repositories/assetCategoryRepository";


export default class ListAssetCategoriesState extends ModelListState<AssetCategory>{

    counts?: Map<AssetCategory, CategoryCount>;

}