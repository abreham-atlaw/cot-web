import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import AssetRequest, { Status } from "../../domain/models/assetRequest";
import AssetRequestForm from "../forms/assetRequestForm";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import { EditAssetRequestState } from "../states/editAssetRequestState";
import AssetRequestRepository from "../../infrastructure/repositories/assetRequestRepository";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";



export default class EditAssetRequestViewModel extends EditModelViewModel<AssetRequest, AssetRequestForm>{
    
    private categoryRepository = new AssetCategoryRepository();

    protected syncFormToModel(form: AssetRequestForm, model: AssetRequest): void {
        model.category = form.category.getValue()!;
        model.note = form.note.getValue()!;
    }
    
    protected syncModelToForm(model: AssetRequest, form: AssetRequestForm): void {
        form.category.value = model.category!;
        form.note.value = model.note;
    }
    
    protected initRepository(): EthersModelRepository<AssetRequest> {
        return new AssetRequestRepository();
    }
    
    protected createInstance(): AssetRequest {
        return new AssetRequest(
            undefined,
            (this.state as EditAssetRequestState).categories![0]!.id!,
            "",
            Status.pending
        )
    }

    public async onInit(): Promise<void> {
        (this.state as EditAssetRequestState).categories = await this.categoryRepository.getAll();
        await super.onInit();
    }


}