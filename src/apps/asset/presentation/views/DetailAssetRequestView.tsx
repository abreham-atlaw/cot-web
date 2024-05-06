import DetailModelView from "@/apps/core/presentation/views/DetailModelView"
import AssetRequest from "../../domain/models/assetRequest";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import { ReactNode } from "react";
import AssetRequestRepository from "../../infrastructure/repositories/assetRequestRepository";
import EditAssetView from "./EditAssetView";
import RequestDetail from "./RequestDetail";
import EditAssetRequestView from "./EditAssetRequestView";
import { useParams } from "react-router-dom";

export default class DetailAssetRequestView extends DetailModelView<AssetRequest>{
    onCreateRepository(): EthersModelRepository<AssetRequest> {
       return new AssetRequestRepository();
    }
    getInstanceValues(instance: AssetRequest): string[] {
        throw new Error("Method not implemented.");
    }
    getDisplayComponent(): ReactNode {
        return <RequestDetail assetRequest={this.state.instance!}/>
    }
    onDelete(instance: AssetRequest): void {
        throw new Error("Method not implemented.");
    }
    getEditInstanceLink(instance: AssetRequest): string {
        throw new Error("Method not implemented.");
    }
    getModalChild(modalClose: () => void, instance: AssetRequest): ReactNode {
        return <EditAssetRequestView closeModal={modalClose} instance={instance}/>
    }


}

export function RequestAssetDetail(){
    const {id} = useParams()
    return <DetailAssetRequestView id={id!}/>
}