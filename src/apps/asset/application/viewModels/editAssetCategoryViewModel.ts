import AssetCategory from "../../domain/models/assetCategory";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import AssetCategoryForm from "../forms/assetCategoryForm";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import EditAssetCategoryState from "../states/editAssetCategoryState";
import RepositoryProvider from "@/di/repositoryProviders";



export default class CreateAssetCategoryViewModel extends EditModelViewModel<AssetCategory, AssetCategoryForm>{
    
    private categoryRepository = RepositoryProvider.provide(AssetCategoryRepository)

    protected async syncFormToModel(form: AssetCategoryForm, model: AssetCategory): Promise<void> {
        model.name = form.name.getValue()!;
        model.parent = form.parent.getValue() ?? undefined;
    }
    protected syncModelToForm(model: AssetCategory, form: AssetCategoryForm): void {
        form.name.value = model.name;
        form.parent.value = model.parent ?? null;
    }
    protected initRepository(): EthersModelRepository<AssetCategory> {
        return RepositoryProvider.provide(AssetCategoryRepository)
    }
    protected createInstance(): AssetCategory {
        return new AssetCategory(
            undefined,
            ""
        );
    }
    
    public async onInit(): Promise<void> {
        (this.state as EditAssetCategoryState).categories = await this.categoryRepository.getAll();
        await super.onInit();
    }

   
} 