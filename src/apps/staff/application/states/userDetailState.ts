import Asset from "@/apps/asset/domain/models/asset";
import AssetRequest from "@/apps/asset/domain/models/assetRequest";
import Profile from "@/apps/auth/domain/models/profile";
import ModelDetailState from "@/common/state/modelDetailState";



export default class UserDetailState extends ModelDetailState<Profile>{

    assets?: Asset[];
    requests?: AssetRequest[];

}