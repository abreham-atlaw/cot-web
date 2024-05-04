import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetRequest, { Status } from "../../domain/models/assetRequest";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import AssetRequestRepository from "../../infrastructure/repositories/assetRequestRepository";
import EditAssetRequestView from "./EditAssetRequestView";
import ModelListState from "@/common/state/modelListState";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import ListAssetRequestsViewModel from "../../application/viewModels/listAssetRequestViewModel";
import Profile from "@/apps/auth/domain/models/profile";


interface ListAssetRequestsProps{
    user?: Profile;
}


export default class ListAssetRequestsView extends ListModelView<AssetRequest, ListAssetRequestsProps>{
   
    getDetailLink(instance: AssetRequest): string {
        return `/base/asset-request/detail?id=${instance.id}`
    }

    getModalChild(modalClose: () => void, instance?: AssetRequest){
        return <EditAssetRequestView closeModal={modalClose} id={instance?.id}/>
    }
    
    onCreateRepository(): EthersModelRepository<AssetRequest> {
        return new AssetRequestRepository();
    }

    onCreateViewModel(state: ModelListState<AssetRequest>): ModelListViewModel<AssetRequest> {
        return new ListAssetRequestsViewModel(state, this.setState.bind(this));
    }

    getInstanceValues(instance: AssetRequest): string[] {
        return [instance.id!.split("-")[0], instance.user!.name, instance.category!.name, Status[instance.status].toUpperCase()];
    }

    getHeadings(): string[] {
        return ["ID", "User Name", "Asset Category", "Status"];
    }

    onDelete(): void {
        throw new Error("Method not implemented.");
    }

    getTitle(): string {
        return "Asset Requests"
    }

    getInitFilters(props: ListAssetRequestsProps): Map<string, unknown> {
        return new Map([
            ["user", props.user]
        ])
    }

}