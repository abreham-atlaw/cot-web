import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import AssetRequest, { Status } from "../../domain/models/assetRequest";
import AssetRequestForm from "../forms/assetRequestForm";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import { EditAssetRequestState } from "../states/editAssetRequestState";
import AssetRequestRepository from "../../infrastructure/repositories/assetRequestRepository";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import { Role } from "@/apps/auth/domain/models/profile";



export default class EditAssetRequestViewModel extends EditModelViewModel<AssetRequest, AssetRequestForm>{
    
    private static readonly RESOLVE_ROLES = [Role.admin, Role.inventory, Role.department];    

    private categoryRepository = new AssetCategoryRepository();
    private authRepository = new AuthRepository();

    protected async syncFormToModel(form: AssetRequestForm, model: AssetRequest): Promise<void> {
        model.category = form.category.getValue()!;
        model.note = form.note.getValue()!;
        if((this.state as EditAssetRequestState).isDepartment){
            model.departmentStatus = form.status.getValue()!;
        }
        else{
            model.status = form.status.getValue()!;
        }
    }
    
    protected syncModelToForm(model: AssetRequest, form: AssetRequestForm): void {
        form.category.value = model.category!;
        form.note.value = model.note;
        form.status.value = model.status;

    }
    
    protected initRepository(): EthersModelRepository<AssetRequest> {
        return new AssetRequestRepository();
    }
    
    protected createInstance(): AssetRequest {
        return new AssetRequest(
            undefined,
            (this.state as EditAssetRequestState).categories![0]!.id!,
            "",
            Status.pending,
            Status.pending
        )
    }

    public async onInit(): Promise<void> {
        const me = await this.authRepository.whoAmI();
        (this.state as EditAssetRequestState).categories = await this.categoryRepository.getAll();
        (this.state as EditAssetRequestState).resolveMode = (!this.state.isCreateMode) && EditAssetRequestViewModel.RESOLVE_ROLES.includes(me.role);
        (this.state as EditAssetRequestState).isDepartment = me.role === Role.department;
        await super.onInit();
    }

}