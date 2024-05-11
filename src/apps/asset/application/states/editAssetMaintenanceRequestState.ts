import EditModelState from "@/common/state/editModelState";
import Asset from "../../domain/models/asset";
import AssetMaintenanceRequest from "../../domain/models/assetMaintenanceRequest";
import AssetMaintenanceRequestForm from "../forms/assetMaintenanceForm";


export class EditAssetMaintenanceRequestState extends EditModelState<AssetMaintenanceRequest, AssetMaintenanceRequestForm>{

    assets?: Asset[];
    resolveMode?: boolean;

}