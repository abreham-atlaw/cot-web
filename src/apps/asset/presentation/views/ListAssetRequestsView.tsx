import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetRequest, { Status } from "../../domain/models/assetRequest";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import AssetRequestRepository from "../../infrastructure/repositories/assetRequestRepository";
import EditAssetRequestView from "./EditAssetRequestView";





export default class ListAssetRequestsView extends ListModelView<AssetRequest>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getModalChild(modalClose: () => void,instance:AssetRequest) {
        return <EditAssetRequestView closeModal={modalClose} instance={instance}/>
    }
    
    onCreateRepository(): EthersModelRepository<AssetRequest> {
        return new AssetRequestRepository();
    }

    getInstanceValues(instance: AssetRequest): string[] {
        return [instance.id!.split("-")[0], instance.user!.name, instance.category!.name, Status[instance.status].toUpperCase()];
    }

    getHeadings(): string[] {
        return ["ID", "User Name", "Asset Category", "Status"];
    }

    getAddInstanceLink(): string {
        return "/base/asset-request/write";
    }

    getEditInstanceLink(instance: AssetRequest): string {
        return `/base/asset-request/write?id=${instance.id!}`;
    }
    
    onDelete(): void {
        throw new Error("Method not implemented.");
    }

    getTitle(): string {
        return "Asset Requests"
    }

}