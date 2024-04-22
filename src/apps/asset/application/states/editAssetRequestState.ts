import EditModelState from "@/common/state/editModelState";
import AssetRequest from "../../domain/models/assetRequest";
import AssetRequestForm from "../forms/assetRequestForm";
import AssetCategory from "../../domain/models/assetCategory";



export class EditAssetRequestState extends EditModelState<AssetRequest, AssetRequestForm>{

    categories?: AssetCategory[];

}