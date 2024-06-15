import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import ModelListState from "@/common/state/modelListState";
import Profile from "@/apps/auth/domain/models/profile";
import AssetMaintenanceRequestRepository from "../../infrastructure/repositories/assetMaintenanceRequestRepository";
import AssetMaintenanceRequest from "../../domain/models/assetMaintenanceRequest";
import RepositoryProvider from "@/di/repositoryProviders";



export default class ListAssetMaintenanceRequestsViewModel extends ModelListViewModel<AssetMaintenanceRequest>{

    
    constructor(state: ModelListState<AssetMaintenanceRequest>, syncState: (state: ModelListState<AssetMaintenanceRequest>) => void){
        super(
            state,
            RepositoryProvider.provide(AssetMaintenanceRequestRepository),
            syncState
        );
    }

    async filterItems(allValues: AssetMaintenanceRequest[], filters: Map<string, unknown>): Promise<AssetMaintenanceRequest[]> {
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