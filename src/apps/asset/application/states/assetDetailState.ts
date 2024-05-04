import ModelDetailState from "@/common/state/modelDetailState";
import Asset from "../../domain/models/asset";
import Profile from "@/apps/auth/domain/models/profile";



export default class AssetDetailState extends ModelDetailState<Asset>{

    owners?: Profile[];

}