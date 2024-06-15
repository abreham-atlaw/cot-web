import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import AssetRepository from "../../infrastructure/repositories/assetRepository";
import ModelListState from "@/common/state/modelListState";
import Asset from "../../domain/models/asset";
import Profile from "@/apps/auth/domain/models/profile";
import AssetCategory from "../../domain/models/assetCategory";
import RepositoryProvider from "@/di/repositoryProviders";



export default class ListAssetsViewModel extends ModelListViewModel<Asset>{

    
    constructor(state: ModelListState<Asset>, syncState: (state: ModelListState<Asset>) => void){
        super(
            state,
            RepositoryProvider.provide(AssetRepository),
            syncState
        );
    }

    async filterItems(allValues: Asset[], filters: Map<string, unknown>): Promise<Asset[]> {
        return allValues.filter(
            (value) => (
                (
                    filters.get("user") == undefined ||
                    (filters.get("user") as Profile).id === value.currentOwnerId
                ) && 
                (
                    filters.get("category") == undefined ||
                    (filters.get("category") as AssetCategory).id === value.categoryId
                )
            )
        )
    }
}