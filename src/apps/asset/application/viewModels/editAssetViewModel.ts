import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import Asset from "../../domain/models/asset";
import AssetForm from "../forms/assetForm";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetRepository from "../../infrastructure/repositories/assetRepository";
import EditAssetState from "../states/editAssetState";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";


export default class CreateAssetViewModel extends EditModelViewModel<Asset, AssetForm>{
    
    private categoryRepository = new AssetCategoryRepository();
    private profileRepository = new ProfileRepository();

    protected syncFormToModel(form: AssetForm, model: Asset): void {
        model.name = form.name.getValue()!;
        model.category = form.category.getValue()!;
        if(model.currentOwnerId !== (form.owner.getValue()?.id ?? null)){
            model.ownersId = [...model.ownersId, form.owner.getValue()?.id ?? null];
        }
    }

    protected syncModelToForm(model: Asset, form: AssetForm): void {
        form.name.value = model.name;
        form.category.value = model.category!;
        form.owner.value = model.currentOwner ?? null;
    }

    protected initRepository(): EthersModelRepository<Asset> {
        return new AssetRepository();
    }

    protected createInstance(): Asset {
        return new Asset(
            undefined,
            "", 
            "",
            [],
            undefined
        );
    }

    public async commitChanges(): Promise<void> {
        if(this.state.isCreateMode){
            const quantity = this.state.form.quantity.getValue()!;
            for(let i=0; i<quantity; i++){
                this.state.instance!.id = undefined;
                await super.commitChanges();
            }
        }
        else{
            await super.commitChanges();
        }
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        (this.state as EditAssetState).categories = await this.categoryRepository.getAll();
        (this.state as EditAssetState).staff = await this.profileRepository.getAll();
    }
    

   
} 