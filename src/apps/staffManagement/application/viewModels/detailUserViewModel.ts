import DetailUserState from "../states/detailUserState";
import AssetRequestRepository from "@/apps/asset/infrastructure/repositories/assetRequestRepository";
import AssetRepository from "@/apps/asset/infrastructure/repositories/assetRepository";
import ModelDetailViewModel from "@/common/viewmodel/modelDetailVIewModel";
import Asset from "@/apps/asset/domain/models/asset";
import AssetRequest from "@/apps/asset/domain/models/assetRequest";
import Profile from "@/apps/auth/domain/models/profile";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";

export class DetailUserViewModel extends ModelDetailViewModel<Profile>{
    private requestRepository = new AssetRequestRepository();
    private assetRespository = new AssetRepository();
    constructor(state:DetailUserState,syncstate: (state: DetailUserState)=>void){
        super(
             state,
             new ProfileRepository(),
             syncstate
        )
    }
    public async onInit(): Promise<void> {
        await super.onInit();
        (this.state as DetailUserState).requests = await this.getUserRequests(this.state.id);
       (this.state as DetailUserState).assets = await this.getUserAsset(this.state.id);
    }

    private async getUserAsset(userId:string): Promise<Asset[]>{
       return await this.assetRespository.filterByUser(userId) ;
    }
    private async getUserRequests(userId:string): Promise<AssetRequest[]>{
        return await this.requestRepository.filterByUser(userId);
    }
} 