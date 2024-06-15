import Profile, { Role } from "@/apps/auth/domain/models/profile";
import EditAssetMaintenanceRequestView from "./EditAssetMaintenanceRequestView";
import AssetMaintenanceRequest from "../../domain/models/assetMaintenanceRequest";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetMaintenanceRequestRepository from "../../infrastructure/repositories/assetMaintenanceRequestRepository";
import ModelListState from "@/common/state/modelListState";
import ListAssetMaintenanceRequestsViewModel from "../../application/viewModels/listAssetMaintenanceRequestViewModel";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import { Status } from "../../domain/models/assetRequest";
import PermissionConfigs, { Pages } from "@/configs/permissionConfigs";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";


interface ListAssetMaintenanceRequestsProps{
    user?: Profile;
}


export default class ListAssetMaintenanceRequestsView extends ListModelView<AssetMaintenanceRequest, ListAssetMaintenanceRequestsProps>{
   
    getDetailLink(instance: AssetMaintenanceRequest): string {
        return `/base/asset-maintenance-request/detail?id=${instance.id}`
    }

    getModalChild(modalClose: () => void, instance?: AssetMaintenanceRequest,close?:()=>void){
        return <EditAssetMaintenanceRequestView closeModal={modalClose} id={instance?.id} close={close}/>
    }
    
    onCreateRepository(): EthersModelRepository<AssetMaintenanceRequest> {
        return new AssetMaintenanceRequestRepository();
    }

    onCreateViewModel(state: ModelListState<AssetMaintenanceRequest>): ModelListViewModel<AssetMaintenanceRequest> {
        return new ListAssetMaintenanceRequestsViewModel(state, this.setState.bind(this));
    }

    getInstanceValues(instance: AssetMaintenanceRequest): string[] {
        return [instance.id!.split("-")[0], instance.user!.name, instance.asset!.name, Status[instance.status].toUpperCase()];
    }

    getHeadings(): string[] {
        return ["ID", "User Name", "Asset Category", "Status"];
    }

    getTitle(): string {
        return "Maintenance Requests"
    }

    getInitFilters(props: ListAssetMaintenanceRequestsProps): Map<string, unknown> {
        return new Map([
            ["user", props.user]
        ])
    }

    private allowWrite(instance: AssetMaintenanceRequest, me: Profile): boolean{
        return (
            (AssetMaintenanceRequestRepository.ADMIN_ROLES.includes(me.role)) ||
            (instance.status === Status.pending)
        )
    }

    allowDelete(instance: AssetMaintenanceRequest, me: Profile): boolean {
        return this.allowWrite(instance, me);
    }

    allowEdit(instance: AssetMaintenanceRequest, me: Profile): boolean {
        return this.allowWrite(instance, me);
    }

    allowAdd(me: Profile): boolean {
        return me.role === Role.staff;
    }

    getAllowedAuthenticationStatus(): AuthenticationStatus[] {
        return PermissionConfigs.VISIT_PERMISSIONS.get(Pages.maintenance)!;
    }

}