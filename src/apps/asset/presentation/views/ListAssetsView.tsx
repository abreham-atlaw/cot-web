import ListModelView from "@/apps/core/presentation/views/ListModelView";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetRepository from "../../infrastructure/repositories/assetRepository";
import Asset from "../../domain/models/asset";
import { ReactNode } from "react";
import EditAssetView from "./EditAssetView";



export default class ListAssetsView extends ListModelView<Asset>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getModalChild(modalClose: () => void,instance?:Asset):ReactNode {
        return <EditAssetView closeModal={modalClose} instance={instance}/>
    }
    
    onCreateRepository(): EthersModelRepository<Asset> {
        return new AssetRepository();
    }

    getInstanceValues(instance: Asset): string[] {
        return [instance.id!.split("-")[0], instance.name, instance.category!.name, "Active", instance.currentOwner?.name ?? "No Owner"];
    }

    getHeadings(): string[] {
        return ["ID", "Name", "Category", "Status", "Owner"];
    }

    getAddInstanceLink(): string {
        return "/base/asset/write";
    }

    getEditInstanceLink(instance: Asset): string {
        return `/base/asset/write?id=${instance.id!}`;
    }
    
    onDelete(): void {
        throw new Error("Method not implemented.");
    }

    getTitle(): string {
        return "Assets";
    }

}