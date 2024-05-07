import AssetRepository from "@/apps/asset/infrastructure/repositories/assetRepository";
import AssetRequestRepository from "@/apps/asset/infrastructure/repositories/assetRequestRepository";
import Profile from "@/apps/auth/domain/models/profile";
import ModelDetailViewModel from "@/common/viewmodel/modelDetailVIewModel";
import UserDetailState from "../states/userDetailState";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";



export default class UserDetailViewModel extends ModelDetailViewModel<Profile>{

    private assetRepository = new AssetRepository();
    private requestRepository = new AssetRequestRepository();
    private authRepository = new AuthRepository();


    constructor(state: UserDetailState, syncState: (state: UserDetailState) => void){
        super(
            state,
            new ProfileRepository(),
            syncState
        );
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        (this.state as UserDetailState).assets = await this.assetRepository.filterByCurrentOwner((this.state as UserDetailState).instance!);
        // (this.state as UserDetailState).requests = await this.requestRepository.filterByUser(me);

    }

}