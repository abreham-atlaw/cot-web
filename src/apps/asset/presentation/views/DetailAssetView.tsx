import DetailModelView from "@/apps/core/presentation/views/DetailModelView";
import Asset from "../../domain/models/asset";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import { ReactNode } from "react";
import AssetRepository from "../../infrastructure/repositories/assetRepository";
import AssetDetail from "./AssetDetail";
import EditAsset from "../components/EditAsset";
import EditAssetView from "./EditAssetView";
import { useParams } from "react-router-dom";

export default class DetailAssetView extends DetailModelView<Asset>{
    onCreateRepository(): EthersModelRepository<Asset> {
        return new AssetRepository();
    }
 
    getDisplayComponent(): ReactNode {
        return <AssetDetail asset={this.state.instance!}/>
    }
    onDelete(instance: Asset): void {
        throw new Error("Method not implemented.");
    }
  
    getModalChild(modalClose: () => void, instance: Asset): ReactNode {
        return <EditAssetView closeModal={modalClose} instance={instance}/>
    }
    
}

export  function AssetDetailView(){
    const {id} = useParams()
     return <DetailAssetView id={id!} />
}