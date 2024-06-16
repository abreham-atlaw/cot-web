import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import ModelListState from "@/common/state/modelListState";
import Profile from "@/apps/auth/domain/models/profile";
import AssetRequest from "../../domain/models/assetRequest";
import AssetRequestRepository from "../../infrastructure/repositories/assetRequestRepository";
import RepositoryProvider from "@/di/repositoryProviders";



export default class ListAssetRequestsViewModel extends ModelListViewModel<AssetRequest>{

    
    constructor(state: ModelListState<AssetRequest>, syncState: (state: ModelListState<AssetRequest>) => void){
        super(
            state,
            RepositoryProvider.provide(AssetRequestRepository),
            syncState
        );
    }

    async filterItems(allValues: AssetRequest[], filters: Map<string, unknown>): Promise<AssetRequest[]> {
        return allValues.filter(
            (value) => (
                (
                    filters.get("user") == undefined ||
                    (filters.get("user") as Profile).id === value.userId
                )
            )
        )
    }
}