import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import AssetMaintenanceRequest from "../../domain/models/assetMaintenanceRequest";
import AssetMaintenanceRequestForm from "../forms/assetMaintenanceForm";
import { Role } from "@/apps/auth/domain/models/profile";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import { EditAssetMaintenanceRequestState } from "../states/editAssetMaintenanceRequestState";
import AssetMaintenanceRequestRepository from "../../infrastructure/repositories/assetMaintenanceRequestRepository";
import { Status } from "../../domain/models/assetRequest";
import AssetRepository from "../../infrastructure/repositories/assetRepository";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import CoreProviders from "@/di/coreProviders";
import RepositoryProvider from "@/di/repositoryProviders";


export default class EditAssetMaintenanceRequestViewModel extends EditModelViewModel<AssetMaintenanceRequest, AssetMaintenanceRequestForm>{
    
    private static readonly RESOLVE_ROLES = [Role.admin, Role.maintainer];    

    private assetRepository = RepositoryProvider.provide(AssetRepository);
    private authRepository = RepositoryProvider.provide(AuthRepository);
    private fileStorage = CoreProviders.provideFileStorage();

    protected async syncFormToModel(form: AssetMaintenanceRequestForm, model: AssetMaintenanceRequest): Promise<void> {
        if((this.state as EditAssetMaintenanceRequestState).resolveMode){
            model.status = form.status.getValue()!;
        }
        else{
            model.asset = form.asset.getValue()!;
            model.note = form.note.getValue()!;
            model.image = await this.fileStorage.upload(form.image.getValue()!);
        }
    }
    
    protected syncModelToForm(model: AssetMaintenanceRequest, form: AssetMaintenanceRequestForm): void {
        form.asset.value = model.asset!;
        form.note.value = model.note;
        form.status.value = model.status;

    }
    
    protected initRepository(): EthersModelRepository<AssetMaintenanceRequest> {
        return RepositoryProvider.provide(AssetMaintenanceRequestRepository);
    }
    
    protected createInstance(): AssetMaintenanceRequest {
        return new AssetMaintenanceRequest(
            undefined,
            ((this.state as EditAssetMaintenanceRequestState).assets!.length === 0)? '' : (this.state as EditAssetMaintenanceRequestState).assets![0]!.id!,
            "",
            Status.pending,
            ""
        )
    }

    public async onInit(): Promise<void> {
        const me = await this.authRepository.whoAmI();
        (this.state as EditAssetMaintenanceRequestState).assets = await this.assetRepository.filterByCurrentOwner(me);
        (this.state as EditAssetMaintenanceRequestState).resolveMode = (!this.state.isCreateMode) && EditAssetMaintenanceRequestViewModel.RESOLVE_ROLES.includes(me.role);
        (this.state as EditAssetMaintenanceRequestState).form = new AssetMaintenanceRequestForm(
            (this.state as EditAssetMaintenanceRequestState).resolveMode!
        )
        await super.onInit();
    }

}