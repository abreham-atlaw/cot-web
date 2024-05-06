import Asset from "@/apps/asset/domain/models/asset";
import AssetRequest from "@/apps/asset/domain/models/assetRequest";
import Profile from "@/apps/auth/domain/models/profile";
// import { User } from "@/apps/request/presentation/domain/User/User";
import ModelDetailState from "@/common/state/modelDetailState";

export default  class  DetailUserState extends ModelDetailState<Profile>{
    requests?: AssetRequest[];
    assets?: Asset[];
}