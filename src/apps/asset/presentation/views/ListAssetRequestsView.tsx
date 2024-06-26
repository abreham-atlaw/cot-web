import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetRequest, { Status } from "../../domain/models/assetRequest";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import AssetRequestRepository from "../../infrastructure/repositories/assetRequestRepository";
import EditAssetRequestView from "./EditAssetRequestView";
import ModelListState from "@/common/state/modelListState";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import ListAssetRequestsViewModel from "../../application/viewModels/listAssetRequestViewModel";
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import PermissionConfigs, { Pages } from "@/configs/permissionConfigs";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import RepositoryProvider from "@/di/repositoryProviders";


interface ListAssetRequestsProps{
    user?: Profile;
}


export default class ListAssetRequestsView extends ListModelView<AssetRequest, ListAssetRequestsProps>{
   
    getDetailLink(instance: AssetRequest): string {
        return `/base/asset-request/detail?id=${instance.id}`
    }

    getModalChild(modalClose: () => void, instance?: AssetRequest,close?:()=>void){
        return <EditAssetRequestView closeModal={modalClose} id={instance?.id} close={close}/>
    }
    
    onCreateRepository(): EthersModelRepository<AssetRequest> {
        return RepositoryProvider.provide(AssetRequestRepository);
    }

    onCreateViewModel(state: ModelListState<AssetRequest>): ModelListViewModel<AssetRequest> {
        return new ListAssetRequestsViewModel(state, this.setState.bind(this));
    }

    getInstanceValues(instance: AssetRequest): string[] {

        return [
            instance.id!.split("-")[0], 
            instance.user!.name, 
            instance.category!.name,
            (this.state.me?.role === Role.department || instance.departmentStatus === Status.rejected)?
            Status[instance.departmentStatus].toUpperCase():
            Status[instance.status].toUpperCase(),
            instance.createDateTime.toLocaleDateString()
        ];
    }

    getHeadings(): string[] {
        return ["ID", "User Name", "Asset Category", "Status", "Requested On"];
    }


    getTitle(): string {
        return "Asset Requests"
    }

    getInitFilters(props: ListAssetRequestsProps): Map<string, unknown> {
        return new Map([
            ["user", props.user]
        ])
    }

    private allowWrite(instance: AssetRequest, me: Profile): boolean{
        return (
            (AssetRequestRepository.ADMIN_ROLES.includes(me.role)) ||
            (me.role === Role.department && instance.status === Status.pending) ||
            (me.role === Role.staff && instance.departmentStatus === Status.pending)
        )
    }

    allowDelete(instance: AssetRequest, me: Profile): boolean {
        return this.allowWrite(instance, me);
    }

    allowEdit(instance: AssetRequest, me: Profile): boolean {
        return this.allowWrite(instance, me);
    }
    
    allowAdd(me: Profile): boolean {
        return me.role === Role.staff;
    }

    getAllowedAuthenticationStatus(): AuthenticationStatus[] {
        return PermissionConfigs.VISIT_PERMISSIONS.get(Pages.request)!;
    }

}