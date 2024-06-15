import ModelDetailViewModel from "@/common/viewmodel/modelDetailVIewModel";
import Asset from "../../domain/models/asset";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import AssetDetailState from "../states/assetDetailState";
import Profile from "@/apps/auth/domain/models/profile";
import AssetRepository from "../../infrastructure/repositories/assetRepository";
import RepositoryProvider from "@/di/repositoryProviders";



export default class AssetDetailViewModel extends ModelDetailViewModel<Asset>{

    private profileRepository = RepositoryProvider.provide(ProfileRepository);


    constructor(state: AssetDetailState, syncState: (state: AssetDetailState) => void){
        super(
            state,
            RepositoryProvider.provide(AssetRepository),
            syncState
        );
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        (this.state as AssetDetailState).owners = await this.getOwners(this.state.instance!.ownersId);
    }

    private async getOwners(ownerIds: (string | null)[]): Promise<Profile[]>{
        const owners = [];
        for(const id of ownerIds){
            if(id === null){
                continue;
            }
            owners.push(await this.profileRepository.getById(id));
        }
        return owners;
    }
}