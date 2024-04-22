import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetRequest, { Status } from "../../domain/models/assetRequest";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import AssetRequestRepository from "../../infrastructure/repositories/assetRequestRepository";



export default class ListAssetRequestsView extends ListModelView<AssetRequest>{
    
    onCreateRepository(): EthersModelRepository<AssetRequest> {
        return new AssetRequestRepository();
    }

    getInstanceValues(instance: AssetRequest): string[] {
        return [instance.id!, instance.user!.name, instance.category!.name, Status[instance.status].toUpperCase()];
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