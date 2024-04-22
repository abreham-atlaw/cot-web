import EditModelState from "@/common/state/editModelState";
import Asset from "../../domain/models/asset";
import AssetForm from "../forms/assetForm";
import AssetCategory from "../../domain/models/assetCategory";
import Profile from "@/apps/auth/domain/models/profile";



export default class EditAssetState extends EditModelState<Asset, AssetForm>{

    categories?: AssetCategory[];
    staff?: Profile[];

}