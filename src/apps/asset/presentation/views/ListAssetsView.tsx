import ListModelView from "@/apps/core/presentation/views/ListModelView";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetRepository from "../../infrastructure/repositories/assetRepository";
import Asset from "../../domain/models/asset";
import { ReactNode } from "react";
import EditAssetView from "./EditAssetView";
import Profile from "@/apps/auth/domain/models/profile";
import ModelListState from "@/common/state/modelListState";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import ListAssetsViewModel from "../../application/viewModels/listAssetViewModel";


interface ListAssetViewProps{
    user?: Profile,
}


export default class ListAssetsView extends ListModelView<Asset, ListAssetViewProps>{

    getModalChild(modalClose: () => void, instance?: Asset):ReactNode {
        return <EditAssetView closeModal={modalClose} id={instance?.id}/>
    }
    
    onCreateRepository(): EthersModelRepository<Asset> {
        return new AssetRepository();
    }

    onCreateViewModel(state: ModelListState<Asset>): ModelListViewModel<Asset> {
        return new ListAssetsViewModel(state, this.setState.bind(this));
    }

    getInstanceValues(instance: Asset): string[] {
        return [instance.id!.split("-")[0], instance.name, instance.category!.name, "Active", instance.currentOwner?.name ?? "No Owner"];
    }

    getDetailLink(instance: Asset): string {
        return `/base/asset/detail?id=${instance.id}`;
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

    getInitFilters(props: ListAssetViewProps): Map<string, unknown> {
        return new Map([
            ["user", props.user]
        ])
    }


}