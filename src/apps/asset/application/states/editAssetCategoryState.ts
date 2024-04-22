import EditModelState from "@/common/state/editModelState";
import AssetCategory from "../../domain/models/assetCategory";
import AssetCategoryForm from "../forms/assetCategoryForm";



export default class EditAssetCategoryState extends EditModelState<AssetCategory, AssetCategoryForm>{

    categories?: AssetCategory[];

}