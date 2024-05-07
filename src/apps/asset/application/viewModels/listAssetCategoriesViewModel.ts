import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import AssetCategory from "../../domain/models/assetCategory";
import ListAssetCategoriesState from "../states/listAssetCategoriesState";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";



export default class ListAssetCategoriesViewModel extends ModelListViewModel<AssetCategory>{

    constructor(state: ListAssetCategoriesState, syncState: (state: ListAssetCategoriesState) => void){
        super(
            state,
            new AssetCategoryRepository(),
            syncState
        );
    }
    
    public async onInit(): Promise<void> {
        await super.onInit();
        (this.state as ListAssetCategoriesState).counts = await (this.repository as AssetCategoryRepository).getCategoryCount(this.state.values!);
    }

}