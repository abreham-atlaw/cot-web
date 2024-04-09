import AssetCategory from "../../domain/models/assetCategory";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import AssetCategoryForm from "../forms/assetCategoryForm";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";



export default class CreateAssetCategoryViewModel extends EditModelViewModel<AssetCategory, AssetCategoryForm>{
    
    protected syncFormToModel(form: AssetCategoryForm, model: AssetCategory): void {
        model.name = form.name.getValue()!;
    }
    protected syncModelToForm(model: AssetCategory, form: AssetCategoryForm): void {
        form.name.value = model.name;
    }
    protected initRepository(): EthersModelRepository<AssetCategory> {
        return new AssetCategoryRepository();
    }
    protected createInstance(): AssetCategory {
        return new AssetCategory(
            ""
        );
    }
    

   
} 