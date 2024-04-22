import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import AssetCategory from "../../domain/models/assetCategory";
import ListAssetCategoriesState, { CategoryCount } from "../states/listAssetCategoriesState";
import AssetRepository from "../../infrastructure/repositories/assetRepository";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";



export default class ListAssetCategoriesViewModel extends ModelListViewModel<AssetCategory>{

    private assetRepository = new AssetRepository();
    
    constructor(state: ListAssetCategoriesState, syncState: (state: ListAssetCategoriesState) => void){
        super(
            state,
            new AssetCategoryRepository(),
            syncState
        );
    }
    
    public async onInit(): Promise<void> {
        await super.onInit();
        (this.state as ListAssetCategoriesState).counts = await this.getCategoryCount(this.state.values!)
    }

    private async getCategoryCount(categories: AssetCategory[]): Promise<Map<AssetCategory, CategoryCount>>{

        const counts = new Map<AssetCategory, CategoryCount>();
        for(const category of categories){
            const assets = await this.assetRepository.filterByCategory(category);
            counts.set(
                category,
                {
                    allocated: assets.filter((asset) => asset.currentOwnerId != null).length,
                    unallocated: assets.filter((asset) => asset.currentOwnerId == null).length,
                    total: assets.length
                }
            )
        }

        return counts;

    }

}